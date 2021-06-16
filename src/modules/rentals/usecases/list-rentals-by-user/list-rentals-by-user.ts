import { inject, injectable } from "tsyringe";

import UsersRepository from "@modules/accounts/repositories/port/users.repository";
import Rental from "@modules/rentals/externals/typeorm/entities/rental";
import RentalsRepository from "@modules/rentals/repositories/ports/rentals.repository";
import AppError from "@shared/errors/app-error";

@injectable()
class ListRentalByUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: UsersRepository,
    @inject("RentalsRepository") private rentalsRepository: RentalsRepository
  ) {
    //
  }

  async execute(userId: string): Promise<Rental[]> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found");
    }

    const rentals = await this.rentalsRepository.listByUser(userId);

    return rentals;
  }
}

export default ListRentalByUserUseCase;
