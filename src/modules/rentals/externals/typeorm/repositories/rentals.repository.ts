import { getRepository, LessThanOrEqual, MoreThan, Repository } from "typeorm";

import RentalsRepository, {
  PeriodRange,
} from "@modules/rentals/repositories/ports/rentals.repository";

import Rental from "../entities/rental";

class TypeORMRentalsRepository implements RentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async save(rental: Rental): Promise<void> {
    this.repository.save(rental);
  }

  async findById(id: string): Promise<Rental | undefined> {
    return this.repository.findOne(id);
  }

  async findByCarInPeriod(carId: string, period: PeriodRange): Promise<Rental | undefined> {
    return this.repository.findOne({
      carId,
      pickUpDate: LessThanOrEqual(period.endDate),
      expectedDropOffDate: MoreThan(period.startDate),
    });
  }

  async findByUserIdInPeriod(userId: string, period: PeriodRange): Promise<Rental | undefined> {
    return this.repository.findOne({
      userId,
      pickUpDate: LessThanOrEqual(period.endDate),
      expectedDropOffDate: MoreThan(period.startDate),
    });
  }

  async listByUser(userId: string): Promise<Rental[]> {
    return this.repository.find({
      where: { userId },
      relations: ["car"],
    });
  }
}

export default TypeORMRentalsRepository;
