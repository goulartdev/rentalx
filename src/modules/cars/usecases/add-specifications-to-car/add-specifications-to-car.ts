import { inject, injectable } from "tsyringe";

import Car from "@modules/cars/externals/typeorm/entities/car";
import AddSpecificationsToCarDTO from "@modules/cars/repositories/dto/add-specifications-to-car";
import CarsRepository from "@modules/cars/repositories/port/cars.repository";
import SpecificationsRepository from "@modules/cars/repositories/port/specifications.repository";
import AppError from "@shared/errors/app-error";

@injectable()
class AddSpecificationsToCar {
  constructor(
    @inject("CarsRepository") private carsRepositories: CarsRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: SpecificationsRepository
  ) {
    //
  }

  async execute(data: AddSpecificationsToCarDTO): Promise<Car> {
    const { carId, specificationsIds } = data;

    const car = await this.carsRepositories.findById(carId);

    if (!car) {
      throw new AppError("Car not found");
    }

    const specifications = await this.specificationsRepository.findByIds(
      specificationsIds
    );

    car.specifications = specifications || [];

    return this.carsRepositories.create(car);
  }
}

export default AddSpecificationsToCar;
