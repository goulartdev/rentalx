import { getRepository, Repository } from "typeorm";

import AvailableCarsFilter from "@modules/cars/repositories/dto/available-cars-filter";
import CreateCarData from "@modules/cars/repositories/dto/create-car.data";
import CarsRepository from "@modules/cars/repositories/port/cars.repository";

import Car from "../entities/car";

class TypeORMCarsRepository implements CarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create(data: CreateCarData): Promise<Car> {
    const car = this.repository.create(data);

    return this.repository.save(car);
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    return this.repository.findOne({ licensePlate });
  }

  async findById(carId: string): Promise<Car | undefined> {
    return this.repository.findOne({ id: carId });
  }

  async listAvailable(filters: AvailableCarsFilter): Promise<Car[]> {
    const { name, categoryId, brand } = filters;

    const query = this.repository
      .createQueryBuilder("C")
      .where("available = :available", { available: true });

    if (name) {
      query.andWhere("name ILIKE :name", { name: `%${name}%` });
    }

    if (brand) {
      query.andWhere("brand ILIKE :brand", { brand: `%${brand}%` });
    }

    if (categoryId) {
      query.andWhere("category_id = :categoryId", { categoryId });
    }

    return query.getMany();
  }
}

export default TypeORMCarsRepository;
