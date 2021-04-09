import InMemoryUsersRepository from "@modules/accounts/repositories/in-memory/users.repository";
import UsersRepository, {
  CreateUserDTO,
} from "@modules/accounts/repositories/port/users.repository";
import CreateUser from "@modules/accounts/usecases/create-user/create-user";
import AppError from "@shared/errors/app-error";

import AuthenticateUser from "./authenticate-user";

let usersRepository: UsersRepository;
let authenticateUser: AuthenticateUser;
let createUser: CreateUser;

describe("Authenticate User", () => {
  beforeAll(() => {
    usersRepository = InMemoryUsersRepository.getInstance();
    authenticateUser = new AuthenticateUser(usersRepository);
    createUser = new CreateUser(usersRepository);
  });

  it("should be able to authenticate an user", async () => {
    const user: CreateUserDTO = {
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

  it("should not be able to authenticate an non existing user", () => {
    expect(async () => {
      await authenticateUser.execute({
        email: "any name",
        password: "any password",
      });
    }).rejects.toThrowError(AppError);
  });

  it("should not be able to authenticate when password is wrong", async () => {
    expect(async () => {
      const user: CreateUserDTO = {
        name: "Foo Bar 2",
        email: "foo.bar.2@test.com",
        driverLicense: "654321",
        password: "654321",
      };

      await createUser.execute(user);

      await authenticateUser.execute({
        email: user.email,
        password: "wrong password",
      });
    }).rejects.toThrowError(AppError);
  });
});
