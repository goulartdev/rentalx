import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/app-error";
import UsersRepository from "@modules/accounts/repositories/port/users.repository";

interface AuthParams {
  email: string;
  password: string;
}

interface AuthPayload {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUser {
  constructor(@inject("UsersRepository") private usersRepository: UsersRepository) {
    //
  }

  async execute({ email, password }: AuthParams): Promise<AuthPayload> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("E-mail or password incorrect", 400);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("E-mail or password incorrect", 400);
    }

    // todo: colocar o hash numa variável de ambiente
    const token = sign({}, "fefc042e77962980b1673089a4a8db31", {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}

export default AuthenticateUser;
