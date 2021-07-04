import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import User from "@modules/accounts/externals/typeorm/entities/user";
import UsersRepository from "@modules/accounts/repositories/port/users.repository";
import AppError from "@shared/errors/app-error";

interface CreateUserDTO {
  name: string;
  password: string;
  email: string;
  driverLicense: string;
  id?: string;
  avatar?: string;
}

@injectable()
class CreateUser {
  constructor(@inject("UsersRepository") private usersRepository: UsersRepository) {
    //
  }

  async execute(params: CreateUserDTO): Promise<User> {
    const { name, email, password, driverLicense } = params;

    const existingUser = await this.usersRepository.findByEmail(email);

    if (existingUser) {
      throw new AppError("E-mail already registered", 400);
    }

    const passwordHash = await hash(password, 10);

    const user = new User();

    Object.assign(user, {
      name,
      email,
      password: passwordHash,
      driverLicense,
    });

    await this.usersRepository.save(user);

    return user;
  }
}

export default CreateUser;
