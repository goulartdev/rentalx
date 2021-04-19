import { inject, injectable } from "tsyringe";

import CarsRepository from "@modules/cars/repositories/port/cars.repository";
import Rental from "@modules/rentals/externals/typeorm/entities/rental";
import CreateRentalDTO from "@modules/rentals/repositories/dto/create-rental.dto";
import RentalsRepository from "@modules/rentals/repositories/ports/rentals.repository";
import AppError from "@shared/errors/app-error";
import DateProvider from "@shared/providers/date-provider/port/DateProvider";

@injectable()
class CreateRental {
  static MIN_RENTAL_HOURS = 24;

  constructor(
    @inject("RentalsRepository") private rentalsRepository: RentalsRepository,
    @inject("CarsRepository") private carsRepository: CarsRepository,
    @inject("DateProvider") private dateProvider: DateProvider
  ) {
    //
  }

  async execute(data: CreateRentalDTO): Promise<Rental> {
    // todo: esse método tá fazendo coisa demais
    const { userId, carId, pickUpDate, expectedDropOffDate } = data;

    this.validateDates(pickUpDate, expectedDropOffDate);

    const car = await this.carsRepository.findById(carId);

    if (!car) {
      throw new AppError("Car not found");
    }

    const period = {
      startDate: pickUpDate,
      endDate: expectedDropOffDate,
    };

    const existingRentalForCar = await this.rentalsRepository.findByCarInPeriod(carId, period);

    if (existingRentalForCar) {
      throw new AppError("Car unavailable for the given period");
    }

    const exstingRentalForUser = await this.rentalsRepository.findByUserIdInPeriod(userId, period);

    if (exstingRentalForUser) {
      throw new AppError("User already have a rental for the given period");
    }

    const diffPickupDropoffHours = this.dateProvider.diffInHours(expectedDropOffDate, pickUpDate);

    if (diffPickupDropoffHours < CreateRental.MIN_RENTAL_HOURS) {
      throw new AppError(`Can't rent a car for less than ${CreateRental.MIN_RENTAL_HOURS} hours`);
    }

    const rental = new Rental();

    Object.assign(rental, {
      ...data,
      contractedDailyRate: car.dailyRate,
      contractedFineAmount: car.fineAmount,
    });

    await this.rentalsRepository.save(rental);

    return rental;
  }

  validateDates(pickUpDate: Date, expectedDropOffDate: Date): void {
    if (this.dateProvider.isPast(pickUpDate) || this.dateProvider.isPast(expectedDropOffDate)) {
      throw new AppError("It's not possible to rent on past dates");
    }

    if (this.dateProvider.isBefore(expectedDropOffDate, pickUpDate)) {
      throw new AppError("Drop-off date must be greater than pick-up date");
    }
  }
}

export default CreateRental;
