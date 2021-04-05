import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import AppError from "../../../../errors/app-error";
import UserRepository from "../../repositories/port/users.repository";

interface AuthDTO {
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
  constructor(@inject("UsersRepository") private usersRepository: UserRepository) {
    //
  }

  async execute({ email, password }: AuthDTO): Promise<AuthPayload> {
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
