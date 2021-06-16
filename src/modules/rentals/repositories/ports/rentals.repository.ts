import Rental from "@modules/rentals/externals/typeorm/entities/rental";

type PeriodRange = {
  startDate: Date;
  endDate: Date;
};

interface RentalsRepository {
  save(rental: Rental): Promise<void>;
  findById(id: string): Promise<Rental | undefined>;
  findByCarInPeriod(carId: string, period: PeriodRange): Promise<Rental | undefined>;
  findByUserIdInPeriod(userId: string, period: PeriodRange): Promise<Rental | undefined>;
  listByUser(userId: string): Promise<Rental[]>;
}

export { PeriodRange };
export default RentalsRepository;
