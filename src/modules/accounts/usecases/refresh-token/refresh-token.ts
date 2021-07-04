import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import UserToken from "@modules/accounts/externals/typeorm/entities/user_token";
import UsersTokensRepository from "@modules/accounts/repositories/port/users-token.repository";
import AppError from "@shared/errors/app-error";
import DateProvider from "@shared/providers/date-provider/port/DateProvider";

interface Payload {
  sub: string;
  email: string;
}

interface TokenResponse {
  token: string;
  refreshToken: string;
}

@injectable()
class RefreshToken {
  constructor(
    @inject("UsersTokensRepository") private usersTokensRepository: UsersTokensRepository,
    @inject("DateProvider") private dateProvider: DateProvider
  ) {
    //
  }

  async execute(token: string): Promise<TokenResponse> {
    const { email, sub: userId } = verify(token, auth.refreshToken.secretHash) as Payload;

    const userToken = await this.usersTokensRepository.findByUserIdAndToken(userId, token);

    if (!userToken) {
      throw new AppError("Refresh token not found.");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refreshToken = sign({ email }, auth.refreshToken.secretHash, {
      subject: userId,
      expiresIn: auth.refreshToken.expiresIn,
    });

    const expiresDate = this.dateProvider.addSeconds(
      this.dateProvider.now(),
      auth.refreshToken.expiresIn
    );

    const newUserToken = new UserToken();

    Object.assign(newUserToken, {
      userId,
      refreshToken,
      expiresDate,
    });

    const newToken = sign({}, auth.token.secretHash, {
      subject: userId,
      expiresIn: auth.token.expiresIn,
    });

    await this.usersTokensRepository.create(userToken);

    return { token: newToken, refreshToken };
  }
}

export default RefreshToken;
