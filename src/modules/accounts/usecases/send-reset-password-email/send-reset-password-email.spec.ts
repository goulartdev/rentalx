import User from "@modules/accounts/externals/typeorm/entities/user";
import InMemoryUsersTokensRepository from "@modules/accounts/repositories/in-memory/users-tokens.repository";
import InMemoryUsersRepository from "@modules/accounts/repositories/in-memory/users.repository";
import UsersTokensRepository from "@modules/accounts/repositories/port/users-token.repository";
import UsersRepository from "@modules/accounts/repositories/port/users.repository";
import AppError from "@shared/errors/app-error";
import DayJSDateProvider from "@shared/providers/date-provider/externals/dayjs.provider";
import DateProvider from "@shared/providers/date-provider/port/DateProvider";
import MailProvider from "@shared/providers/mail-provider/port/mail-provider";

import CreateUser from "../create-user/create-user";
import SendResetPasswordEmail from "./send-reset-password-email";

let usersRepository: UsersRepository;
let usersTokensRepository: UsersTokensRepository;
let dateProvider: DateProvider;
let createUser: CreateUser;
let sendResetPasswordEmail: SendResetPasswordEmail;
let user: User;

const mailProvider: jest.Mocked<MailProvider> = {
  sendMail: jest.fn(),
};

describe("Send reset password email", () => {
  beforeAll(async () => {
    usersRepository = InMemoryUsersRepository.getInstance();
    usersTokensRepository = InMemoryUsersTokensRepository.getInstance();
    dateProvider = new DayJSDateProvider();

    createUser = new CreateUser(usersRepository);

    sendResetPasswordEmail = new SendResetPasswordEmail(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider
    );

    user = await createUser.execute({
      name: "Foo Bar Mail Test",
      email: "foo.bar.mail@test.com",
      driverLicense: "123456",
      password: "123456",
    });
  });

  it("should be able to send a reset password email to an user", async () => {
    const createToken = spyOn(usersTokensRepository, "create");

    await sendResetPasswordEmail.execute(user.email);

    expect(mailProvider.sendMail).toHaveBeenCalledTimes(1);
    expect(mailProvider.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: user.email,
        subject: expect.any(String),
        templatePath: expect.any(String),
        templateVars: expect.any(Object),
      })
    );
    expect(createToken).toBeCalledTimes(1);
  });

  it("should not be able to send a reset password email to a non existing user", async () => {
    const email = "non.existing@test.com";
    await expect(sendResetPasswordEmail.execute(email)).rejects.toBeInstanceOf(AppError);
    expect(mailProvider.sendMail).toHaveBeenCalledTimes(0);
  });
});
