import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import UsersTokensRepository from "@modules/accounts/repositories/port/users-token.repository";
import UsersRepository from "@modules/accounts/repositories/port/users.repository";
import AppError from "@shared/errors/app-error";
import DateProvider from "@shared/providers/date-provider/port/DateProvider";

@injectable()
class ResetPassword {
  constructor(
    @inject("UsersTokensRepository") private usersTokensRepository: UsersTokensRepository,
    @inject("UsersRepository") private usersRepository: UsersRepository,
    @inject("DateProvider") private dateProvider: DateProvider
  ) {
    //
  }

  async execute(token: string, newPassword: string): Promise<void> {
    const userToken = await this.usersTokensRepository.findByToken(token);

    if (!userToken || this.dateProvider.isPast(userToken.expiresDate)) {
      throw new AppError("Invalid token!");
    }

    const user = await this.usersRepository.findById(userToken.userId);

    if (!user) {
      throw new AppError("User not found!");
    }

    user.password = await hash(newPassword, 10);

    await this.usersRepository.save(user);
    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export default ResetPassword;
