import InMemoryCarsRepository from "@modules/cars/repositories/in-memory/cars.repository";
import CarsRepository from "@modules/cars/repositories/port/cars.repository";
import AppError from "@shared/errors/app-error";

import CreateCar from "./create-car";

let carsRepository: CarsRepository;
let createCar: CreateCar;

describe("Crete Car", () => {
  beforeEach(() => {
    carsRepository = new InMemoryCarsRepository();
    createCar = new CreateCar(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const carData = {
      name: "Batcar",
      description: "Fast, furious and ready to destroy. All terrain",
      dailyRate: 2000,
      licensePlate: "BAT-0666",
      fineAmount: 60,
      brand: "Wayne Enterprises",
      categoryId: "Crime combat",
    };

    const car = await createCar.execute(carData);

    expect(car).toEqual(
      expect.objectContaining({
        ...carData,
        id: expect.any(String),
        available: expect.any(Boolean),
        createdAt: expect.any(Date),
      })
    );

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with an already registered license plate", () => {
    return expect(async () => {
      await createCar.execute({
        name: "Car 1",
        description: "Some car",
        dailyRate: 50,
        licensePlate: "ABC-1234",
        fineAmount: 50,
        brand: "Some brand",
        categoryId: "some-uuid",
      });

      await createCar.execute({
        name: "Car 2",
        description: "Some other car",
        dailyRate: 70,
        licensePlate: "ABC-1234",
        fineAmount: 60,
        brand: "Some brand",
        categoryId: "some-uuid",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should register a new car as 'available' by default ", async () => {
    const car = await createCar.execute({
      name: "Batcar",
      description: "Fast, furious and ready to destroy. All terrain",
      dailyRate: 2000,
      licensePlate: "BAT-0666",
      fineAmount: 60,
      brand: "Wayne Enterprises",
      categoryId: "Crime combat",
    });

    expect(car.available).toBe(true);
  });
});
