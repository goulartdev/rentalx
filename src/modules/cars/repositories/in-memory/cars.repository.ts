import Car from "@modules/cars/externals/typeorm/entities/car";

import CreateCarData from "../dto/create-car.data";
import CarsRepository from "../port/cars.repository";

class InMemoryCarsRepository implements CarsRepository {
  private cars: Car[];

  public constructor() {
    this.cars = [];
  }

  async create(data: CreateCarData): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      ...data,
      createdAt: new Date(),
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.licensePlate === licensePlate);
  }
}

export default InMemoryCarsRepository;
