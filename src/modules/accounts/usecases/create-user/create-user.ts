import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import AppError from "@errors/app-error";
import UsersRepository, {
  CreateUserDTO,
} from "@modules/accounts/repositories/port/users.repository";

@injectable()
class CreateUser {
  constructor(@inject("UsersRepository") private usersRepository: UsersRepository) {
    //
  }

  async execute(params: CreateUserDTO): Promise<void> {
    const { name, email, password, driverLicense } = params;

    const existingUser = await this.usersRepository.findByEmail(email);

    if (existingUser) {
      throw new AppError("E-mail already registered", 400);
    }

    const passwordHash = await hash(password, 10);

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driverLicense,
    });
  }
}

export default CreateUser;
