import Rental from "@modules/rentals/externals/typeorm/entities/rental";

import RentalsRepository, { PeriodRange } from "../ports/rentals.repository";

class InMemoryRentalsRepository implements RentalsRepository {
  rentals: Rental[];

  constructor() {
    this.rentals = [];
  }

  async save(rental: Rental): Promise<void> {
    this.rentals.push(rental);
  }

  async findById(id: string): Promise<Rental | undefined> {
    return this.rentals.find((rental) => rental.id === id);
  }

  async findByCarInPeriod(carId: string, period: PeriodRange): Promise<Rental | undefined> {
    return this.rentals
      .filter((rental) => rental.carId === carId)
      .find((rental) => {
        return (
          period.startDate <= rental.expectedDropOffDate && rental.pickUpDate <= period.endDate
        );
      });
  }

  async findByUserIdInPeriod(userId: string, period: PeriodRange): Promise<Rental | undefined> {
    return this.rentals
      .filter((rental) => rental.userId === userId)
      .find((rental) => {
        return (
          period.startDate <= rental.expectedDropOffDate && rental.pickUpDate <= period.endDate
        );
      });
  }

  async listByUser(userId: string): Promise<Rental[]> {
    return this.rentals.filter((rental) => rental.userId === userId);
  }
}

export default InMemoryRentalsRepository;
