import Car from "@modules/cars/externals/typeorm/entities/car";

import CreateCarData from "../dto/create-car.data";

interface CarsRepository {
  create(data: CreateCarData): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car | undefined>;
}

export default CarsRepository;
