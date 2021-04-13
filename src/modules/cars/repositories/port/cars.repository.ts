import Car from "@modules/cars/externals/typeorm/entities/car";

import AvailableCarsFilter from "../dto/available-cars-filter";
import CreateCarData from "../dto/create-car.data";

interface CarsRepository {
  create(data: CreateCarData): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car | undefined>;
  listAvailable(filters: AvailableCarsFilter): Promise<Car[]>;
}

export default CarsRepository;
