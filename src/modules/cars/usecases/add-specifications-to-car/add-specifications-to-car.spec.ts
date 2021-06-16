import Car from "@modules/cars/externals/typeorm/entities/car";
import Specification from "@modules/cars/externals/typeorm/entities/specification";
import InMemoryCarsRepository from "@modules/cars/repositories/in-memory/cars.repository";
import InMemorySpecificationRepository from "@modules/cars/repositories/in-memory/specifications.repository";
import CarsRepository from "@modules/cars/repositories/port/cars.repository";
import SpecificationsRepository from "@modules/cars/repositories/port/specifications.repository";
import AppError from "@shared/errors/app-error";

import AddSpecificationsToCar from "./add-specifications-to-car";

let carsRepository: CarsRepository;
let specificationsRepository: SpecificationsRepository;
let addSpecificationsToCar: AddSpecificationsToCar;
let car: Car;
let specifications: Specification[];

describe("Add specifications to car", () => {
  beforeEach(async () => {
    carsRepository = new InMemoryCarsRepository();
    specificationsRepository = new InMemorySpecificationRepository();
    addSpecificationsToCar = new AddSpecificationsToCar(carsRepository, specificationsRepository);

    car = await carsRepository.create({
      name: "Car 1",
      description: "Some car",
      dailyRate: 50,
      licensePlate: "ABC-1234",
      fineAmount: 50,
      brand: "Some brand",
      categoryId: "some-uuid",
    });

    const spec1 = await specificationsRepository.create({
      name: "Test 1",
      description: "Spec Test 1",
    });

    const spec2 = await specificationsRepository.create({
      name: "Test 2",
      description: "Spec Test 2",
    });

    const spec3 = await specificationsRepository.create({
      name: "Test 3",
      description: "Spec Test 3",
    });

    specifications = [spec1, spec2, spec3];
  });

  it("should be able to add specifications to an existing car", async () => {
    const carId = car.id;
    const specificationsIds = specifications.map(({ id }) => id);

    const updatedCar = await addSpecificationsToCar.execute({ carId, specificationsIds });

    expect(updatedCar.specifications).toEqual(specifications);
  });

  it("should not be able to add specifications to a non existing car", async () => {
    const carId = "non_existing_id";
    const specificationsIds = specifications.map(({ id }) => id);

    await expect(
      addSpecificationsToCar.execute({ carId, specificationsIds })
    ).rejects.toBeInstanceOf(AppError);
  });
});
