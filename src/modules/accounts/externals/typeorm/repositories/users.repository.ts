import { getRepository, Repository } from "typeorm";

import UsersRepository from "@modules/accounts/repositories/port/users.repository";

import User from "../entities/user";

class TypeORMUsersRepository implements UsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email });
  }

  async findById(id: string): Promise<User | undefined> {
    return this.repository.findOne({ id });
  }
}

export default TypeORMUsersRepository;
