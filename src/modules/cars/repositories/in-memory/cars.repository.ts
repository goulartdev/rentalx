import Car from "@modules/cars/externals/typeorm/entities/car";

import AvailableCarsFilter from "../dto/available-cars-filter";
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

  async listAvailable(filters: AvailableCarsFilter): Promise<Car[]> {
    const { name, categoryId, brand } = filters;

    const isAvailable = (car: Car) => car.available;
    const byName = (car: Car) => (name ? car.name.includes(name) : true);
    const byCategory = (car: Car) => (categoryId ? car.categoryId === categoryId : true);
    const byBrand = (car: Car) => (brand ? car.brand.includes(brand) : true);

    return this.cars
      .filter(isAvailable)
      .filter(byName)
      .filter(byCategory)
      .filter(byBrand);
  }
}

export default InMemoryCarsRepository;
