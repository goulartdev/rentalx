import InMemoryUsersTokensRepository from "@modules/accounts/repositories/in-memory/users-tokens.repository";
import InMemoryUsersRepository from "@modules/accounts/repositories/in-memory/users.repository";
import UsersTokensRepository from "@modules/accounts/repositories/port/users-token.repository";
import UsersRepository from "@modules/accounts/repositories/port/users.repository";
import AppError from "@shared/errors/app-error";
import getDateProvider from "@shared/providers/date-provider";
import DateProvider from "@shared/providers/date-provider/port/DateProvider";

import CreateUser from "../create-user/create-user";
import AuthenticateUser from "./authenticate-user";

let usersRepository: UsersRepository;
let usersTokensRepository: UsersTokensRepository;
let authenticateUser: AuthenticateUser;
let createUser: CreateUser;
let dateProvider: DateProvider;

describe("Authenticate User", () => {
  beforeAll(() => {
    usersRepository = InMemoryUsersRepository.getInstance();
    usersTokensRepository = InMemoryUsersTokensRepository.getInstance();
    dateProvider = getDateProvider();
    authenticateUser = new AuthenticateUser(usersRepository, usersTokensRepository, dateProvider);
    createUser = new CreateUser(usersRepository);
  });

  it("should be able to authenticate an user", async () => {
    const user = {
      name: "Foo Bar 1",
      email: "foo.bar.1@test.com",
      driverLicense: "123456",
      password: "123456",
    };

    await createUser.execute(user);

    const result = await authenticateUser.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an non existing user", async () => {
    await expect(
      authenticateUser.execute({
        email: "any name",
        password: "any password",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate when password is wrong", async () => {
    const user = {
      name: "Foo Bar 2",
      email: "foo.bar.2@test.com",
      driverLicense: "654321",
      password: "654321",
    };

    await createUser.execute(user);

    return expect(
      authenticateUser.execute({
        email: user.email,
        password: "wrong password",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
