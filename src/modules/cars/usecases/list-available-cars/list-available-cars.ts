import Car from "@modules/cars/externals/typeorm/entities/car";
import AvailableCarsFilter from "@modules/cars/repositories/dto/available-cars-filter";
import CarsRepository from "@modules/cars/repositories/port/cars.repository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListAvailableCars {
  constructor(@inject("CarsRepository") private carsRepository: CarsRepository) {
    //
  }

  async execute(filters: AvailableCarsFilter): Promise<Car[]> {
    return this.carsRepository.listAvailable(filters);
  }
}

export default ListAvailableCars;
