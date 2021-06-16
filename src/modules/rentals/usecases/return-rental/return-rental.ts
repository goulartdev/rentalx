import { inject, injectable } from "tsyringe";

import Rental from "@modules/rentals/externals/typeorm/entities/rental";
import RentalsRepository from "@modules/rentals/repositories/ports/rentals.repository";
import AppError from "@shared/errors/app-error";
import DateProvider from "@shared/providers/date-provider/port/DateProvider";

@injectable()
class ReturnRental {
  constructor(
    @inject("RentalsRepository") private rentalsRepository: RentalsRepository,
    @inject("DateProvider") private dateProvider: DateProvider
  ) {
    //
  }

  async execute(rentalId: string): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(rentalId);

    if (!rental) {
      throw new AppError("Rental not found.");
    }

    if (rental.dropOffDate) {
      throw new AppError("This rental was already returned.");
    }

    rental.dropOffDate = this.dateProvider.now();

    rental.total = this.calculateRentalAmount(rental);

    await this.rentalsRepository.save(rental);

    return rental;
  }

  calculateRentalAmount(rental: Rental): number {
    const expectedDays = this.getRentalDays(rental.pickUpDate, rental.expectedDropOffDate);
    const occurredDays = this.getRentalDays(rental.pickUpDate, rental.dropOffDate);

    const rentalAmount = occurredDays * rental.contractedDailyRate;

    const delayDays = Math.max(occurredDays - expectedDays, 0);
    const fineAmount = delayDays * rental.contractedFineAmount;

    const totalAmount = rentalAmount + fineAmount;

    return totalAmount;
  }

  getRentalDays(date1: Date, date2: Date): number {
    return Math.max(Math.ceil(this.dateProvider.diffInDays(date1, date2)), 1);
  }
}

export default ReturnRental;
