import Car from "@modules/cars/externals/typeorm/entities/car";
import InMemoryCarsRepository from "@modules/cars/repositories/in-memory/cars.repository";
import CarsRepository from "@modules/cars/repositories/port/cars.repository";

import ListAvailableCars from "./list-available-cars";

let carsRepository: CarsRepository;
let listCars: ListAvailableCars;
let cars: Car[];

describe("List Cars", () => {
  beforeEach(async () => {
    carsRepository = new InMemoryCarsRepository();
    listCars = new ListAvailableCars(carsRepository);

    const car0 = await carsRepository.create({
      name: "TEST CAR 0",
      description: "Test Car 0 description",
      dailyRate: 80,
      licensePlate: "ASD-1234",
      fineAmount: 60,
      brand: "Some brand 2",
      categoryId: "some_caregory_1",
    });

    const car1 = await carsRepository.create({
      name: "TEST CAR 1",
      description: "Test Car 1 description",
      dailyRate: 90,
      licensePlate: "QWE-1234",
      fineAmount: 50,
      brand: "Some brand 1",
      categoryId: "some_caregory_1",
    });

    car1.available = false;

    const car2 = await carsRepository.create({
      name: "TEST CAR 2",
      description: "Test Car 2 description",
      dailyRate: 90,
      licensePlate: "ZXC-1234",
      fineAmount: 40,
      brand: "Some brand 1",
      categoryId: "some_caregory_2",
    });

    cars = [car0, car1, car2];
  });

  it("Shoul be able to list all available cars", async () => {
    const availableCars = await listCars.execute({});

    expect(availableCars).toEqual([cars[0], cars[2]]);
  });

  it("should be able to filter all available cars by name", async () => {
    const availableCars = await listCars.execute({ name: "CAR 2" });

    expect(availableCars).toEqual([cars[2]]);
  });

  it("should be able to filter all available cars by category", async () => {
    const availableCars = await listCars.execute({ categoryId: "some_caregory_1" });

    expect(availableCars).toEqual([cars[0]]);
  });

  it("should be able to filter all available cars by brand", async () => {
    const availableCars = await listCars.execute({ brand: "brand 1" });

    expect(availableCars).toEqual([cars[2]]);
  });
});
