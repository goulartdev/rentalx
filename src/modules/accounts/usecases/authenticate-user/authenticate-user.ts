import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import UserToken from "@modules/accounts/externals/typeorm/entities/user_token";
import { UsersTokensRepository } from "@modules/accounts/repositories/port/users-token.repository";
import UsersRepository from "@modules/accounts/repositories/port/users.repository";
import AppError from "@shared/errors/app-error";
import DateProvider from "@shared/providers/date-provider/port/DateProvider";

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
  refreshToken: string;
}

@injectable()
class AuthenticateUser {
  constructor(
    @inject("UsersRepository") private usersRepository: UsersRepository,
    @inject("UsersTokensRepository") private usersTokensRepository: UsersTokensRepository,
    @inject("DateProvider") private dateProvider: DateProvider
  ) {
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

    const token = sign({}, auth.token.secretHash, {
      subject: user.id,
      expiresIn: auth.token.expiresIn,
    });

    const refreshToken = sign({ email }, auth.refreshToken.secretHash, {
      subject: user.id,
      expiresIn: auth.refreshToken.expiresIn,
    });

    const expiresDate = this.dateProvider.addSeconds(
      this.dateProvider.now(),
      auth.refreshToken.expiresIn
    );

    const userToken = new UserToken();

    Object.assign(userToken, {
      userId: user.id,
      refreshToken,
      expiresDate,
    });

    await this.usersTokensRepository.create(userToken);

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refreshToken,
    };
  }
}

export default AuthenticateUser;
