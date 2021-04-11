import { inject, injectable } from "tsyringe";

import Car from "@modules/cars/externals/typeorm/entities/car";
import CreateCarData from "@modules/cars/repositories/dto/create-car.data";
import CarsRepository from "@modules/cars/repositories/port/cars.repository";
import AppError from "@shared/errors/app-error";

@injectable()
class CreateCar {
  constructor(@inject("CarsRepository") private carsRepository: CarsRepository) {
    //
  }

  async execute(data: CreateCarData): Promise<Car> {
    const existingCar = await this.carsRepository.findByLicensePlate(data.licensePlate);

    if (existingCar) {
      throw new AppError("A car with this license plate already exists.");
    }

    return this.carsRepository.create(data);
  }
}

export default CreateCar;
