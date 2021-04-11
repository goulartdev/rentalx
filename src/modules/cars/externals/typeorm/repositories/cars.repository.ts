import { getRepository, Repository } from "typeorm";

import CreateCarData from "@modules/cars/repositories/dto/create-car.data";
import CarsRepository from "@modules/cars/repositories/port/cars.repository";

import Car from "../entities/car";

class TypeORMCarsRepository implements CarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  create(data: CreateCarData): Promise<Car> {
    const car = this.repository.create(data);

    return this.repository.save(car);
  }

  findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    return this.repository.findOne({ licensePlate });
  }
}

export default TypeORMCarsRepository;
