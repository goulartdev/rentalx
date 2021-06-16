import Car from "@modules/cars/externals/typeorm/entities/car";
import InMemoryCarsRepository from "@modules/cars/repositories/in-memory/cars.repository";
import CarsRepository from "@modules/cars/repositories/port/cars.repository";
import InMemoryRentalsRepository from "@modules/rentals/repositories/in-memory/rentals.repository";
import RentalsRepository from "@modules/rentals/repositories/ports/rentals.repository";
import AppError from "@shared/errors/app-error";
import getDateProvider from "@shared/providers/date-provider";

import CreateRental from "./create-rental";

const dateProvider = getDateProvider();

let createRental: CreateRental;
let rentalsRepository: RentalsRepository;
let carsRepository: CarsRepository;

let cars: Car[];

describe("Create Rental", () => {
  beforeEach(async () => {
    rentalsRepository = new InMemoryRentalsRepository();
    carsRepository = new InMemoryCarsRepository();
    createRental = new CreateRental(rentalsRepository, carsRepository, dateProvider);

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

    cars = [car0, car1];
  });

  it("should be able to create a new rental", async () => {
    const rentalData = {
      carId: cars[0].id,
      userId: "some-user-id-1",
      pickUpDate: dateProvider.addHours(new Date(), 20),
      expectedDropOffDate: dateProvider.addHours(new Date(), 50),
    };

    const rental = await createRental.execute(rentalData);

    const persisted = await rentalsRepository.findById(rental.id);

    expect(persisted).toEqual(
      expect.objectContaining({
        ...rentalData,
        id: expect.any(String),
        contractedDailyRate: cars[0].dailyRate,
        contractedFineAmount: cars[0].fineAmount,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    );
  });

  it("should be able to create two rentals for the same car if in different periods", async () => {
    const rentalData1 = {
      carId: cars[0].id,
      userId: "some-user-id-1",
      pickUpDate: dateProvider.addHours(new Date(), 12),
      expectedDropOffDate: dateProvider.addHours(new Date(), 50),
    };

    const rentalData2 = {
      carId: cars[0].id,
      userId: "some-user-id-2",
      pickUpDate: dateProvider.addHours(new Date(), 70),
      expectedDropOffDate: dateProvider.addHours(new Date(), 100),
    };

    const car1 = await createRental.execute(rentalData1);
    const car2 = await createRental.execute(rentalData2);

    expect(car1).toHaveProperty("id");
    expect(car2).toHaveProperty("id");
  });

  it("should be able to create two rentals for the same user if in different periods", async () => {
    const rentalData1 = {
      carId: cars[0].id,
      userId: "some-user-id-1",
      pickUpDate: dateProvider.addHours(new Date(), 12),
      expectedDropOffDate: dateProvider.addHours(new Date(), 50),
    };

    const rentalData2 = {
      carId: cars[1].id,
      userId: "some-user-id-1",
      pickUpDate: dateProvider.addHours(new Date(), 70),
      expectedDropOffDate: dateProvider.addHours(new Date(), 100),
    };

    const car1 = await createRental.execute(rentalData1);
    const car2 = await createRental.execute(rentalData2);

    expect(car1).toHaveProperty("id");
    expect(car2).toHaveProperty("id");
  });

  it("should not be able to create a rental on past dates", async () => {
    const rentalData = {
      carId: cars[0].id,
      userId: "some-user-id-1",
      pickUpDate: dateProvider.addHours(new Date(), -20),
      expectedDropOffDate: dateProvider.addHours(new Date(), 60),
    };

    await expect(createRental.execute(rentalData)).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a rental with expected drop-off date before pickup-date", async () => {
    const rentalData = {
      carId: cars[0].id,
      userId: "some-user-id-1",
      pickUpDate: dateProvider.addHours(new Date(), 50),
      expectedDropOffDate: dateProvider.addHours(new Date(), 10),
    };

    await expect(createRental.execute(rentalData)).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to rent a car for a non-existing car", async () => {
    const rentalData = {
      carId: "some-non-sxisting-id",
      userId: "some-user-id-1",
      pickUpDate: dateProvider.addHours(new Date(), 20),
      expectedDropOffDate: dateProvider.addHours(new Date(), 60),
    };

    await expect(createRental.execute(rentalData)).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to rent a car for less than 24 hours", async () => {
    const pickupDate = dateProvider.addHours(new Date(), 24);

    const rentalData = {
      carId: cars[0].id,
      userId: "some-user-id-1",
      pickUpDate: pickupDate,
      expectedDropOffDate: dateProvider.addHours(pickupDate, 23),
    };

    await expect(createRental.execute(rentalData)).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to rent a car if its already reserved for the given period, test 1", async () => {
    /*
    test case:
    rental 1 period:    d1            d2
    rental 2 period:          d1            d2
  */

    const rentalData1 = {
      carId: cars[0].id,
      userId: "some-user-id-1",
      pickUpDate: dateProvider.addHours(new Date(), 24),
      expectedDropOffDate: dateProvider.addHours(new Date(), 72),
    };

    const rentalData2 = {
      carId: cars[0].id,
      userId: "some-user-id-2",
      pickUpDate: dateProvider.addHours(new Date(), 36),
      expectedDropOffDate: dateProvider.addHours(new Date(), 90),
    };

    await createRental.execute(rentalData1);

    await expect(createRental.execute(rentalData2)).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to rent a car if its already reserved for the given period, test 2", async () => {
    /*
    test case:
    rental 1 period:       d1            d2
    rental 2 period:   d1            d2
  */

    const rentalData1 = {
      carId: cars[0].id,
      userId: "some-user-id-1",
      pickUpDate: dateProvider.addHours(new Date(), 36),
      expectedDropOffDate: dateProvider.addHours(new Date(), 72),
    };

    const rentalData2 = {
      carId: cars[0].id,
      userId: "some-user-id-2",
      pickUpDate: dateProvider.addHours(new Date(), 24),
      expectedDropOffDate: dateProvider.addHours(new Date(), 48),
    };

    await createRental.execute(rentalData1);

    await expect(createRental.execute(rentalData2)).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to rent a car if its already reserved for the given period, test 3", async () => {
    /*
    test case:
    rental 1 period:       d1         d2
    rental 2 period:   d1                  d2
  */
    const rentalData1 = {
      carId: cars[0].id,
      userId: "some-user-id-1",
      pickUpDate: dateProvider.addHours(new Date(), 36),
      expectedDropOffDate: dateProvider.addHours(new Date(), 72),
    };

    const rentalData2 = {
      carId: cars[0].id,
      userId: "some-user-id-2",
      pickUpDate: dateProvider.addHours(new Date(), 24),
      expectedDropOffDate: dateProvider.addHours(new Date(), 90),
    };

    await createRental.execute(rentalData1);
    await expect(createRental.execute(rentalData2)).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to rent a car if its already reserved for the given period, test 4", async () => {
    /*
    test case:
    rental 1 period:   d1                  d2
    rental 2 period:        d1        d2
  */

    const rentalData1 = {
      carId: cars[0].id,
      userId: "some-user-id-1",
      pickUpDate: dateProvider.addHours(new Date(), 24),
      expectedDropOffDate: dateProvider.addHours(new Date(), 90),
    };

    const rentalData2 = {
      carId: cars[0].id,
      userId: "some-user-id-2",
      pickUpDate: dateProvider.addHours(new Date(), 36),
      expectedDropOffDate: dateProvider.addHours(new Date(), 70),
    };

    await createRental.execute(rentalData1);

    await expect(createRental.execute(rentalData2)).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to rent a car if the user already have a reservation for the given period", async () => {
    const rentalData1 = {
      carId: cars[0].id,
      userId: "some-user-id-1",
      pickUpDate: dateProvider.addHours(new Date(), 12),
      expectedDropOffDate: dateProvider.addHours(new Date(), 40),
    };

    const rentalData2 = {
      carId: cars[1].id,
      userId: "some-user-id-1",
      pickUpDate: dateProvider.addHours(new Date(), 24),
      expectedDropOffDate: dateProvider.addHours(new Date(), 70),
    };

    await createRental.execute(rentalData1);

    await expect(createRental.execute(rentalData2)).rejects.toBeInstanceOf(AppError);
  });
});
