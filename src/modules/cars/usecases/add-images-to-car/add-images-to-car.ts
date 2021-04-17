import { inject, injectable } from "tsyringe";

import Car from "@modules/cars/externals/typeorm/entities/car";
import CarImage from "@modules/cars/externals/typeorm/entities/car-image";
import AddImagesToCarDTO from "@modules/cars/repositories/dto/add-images-to-car";
import CarsRepository from "@modules/cars/repositories/port/cars.repository";
import AppError from "@shared/errors/app-error";

@injectable()
class AddImagesToCar {
  constructor(@inject("CarsRepository") private carsRepository: CarsRepository) {
    //
  }

  async execute({ carId, imagesNames }: AddImagesToCarDTO): Promise<Car> {
    const car = await this.carsRepository.findById(carId);

    if (!car) {
      throw new AppError("Car not found");
    }

    if (!car.images) {
      car.images = [];
    }

    imagesNames.forEach((imageName) => {
      const image = new CarImage();
      image.imageName = imageName;

      car.images.push(image);
    });

    return this.carsRepository.create(car);
  }
}

export default AddImagesToCar;
