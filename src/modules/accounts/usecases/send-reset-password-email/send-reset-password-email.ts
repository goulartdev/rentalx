import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import UserToken from "@modules/accounts/externals/typeorm/entities/user_token";
import UsersTokensRepository from "@modules/accounts/repositories/port/users-token.repository";
import UsersRepository from "@modules/accounts/repositories/port/users.repository";
import AppError from "@shared/errors/app-error";
import DateProvider from "@shared/providers/date-provider/port/DateProvider";
import MailProvider from "@shared/providers/mail-provider/port/mail-provider";

@injectable()
class SendResetPasswordEmail {
  constructor(
    @inject("UsersRepository") private usersRepository: UsersRepository,
    @inject("UsersTokensRepository") private usersTokensRepository: UsersTokensRepository,
    @inject("DateProvider") private dateProvider: DateProvider,
    @inject("MailProvider") private mailProvider: MailProvider
  ) {
    //
  }

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User not found.");
    }

    const token = uuidV4();
    const userToken = new UserToken();

    Object.assign(userToken, {
      refreshToken: token,
      userId: user.id,
      expiresDate: this.dateProvider.addHours(this.dateProvider.now(), 3),
    });

    await this.usersTokensRepository.create(userToken);

    const templatePath = resolve(__dirname, "..", "..", "views", "emails", "reset-password.hbs");

    await this.mailProvider.sendMail({
      to: email,
      subject: "Password Reset",
      templatePath,
      templateVars: {
        name: user.name,
        link: `${process.env.RESET_EMAIL_URL}${token}`,
      },
    });
  }
}

export default SendResetPasswordEmail;
