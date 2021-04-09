import { getRepository, Repository } from "typeorm";

import User from "@modules/accounts/entities/user";
import UsersRepository, {
  CreateUserDTO,
} from "@modules/accounts/repositories/port/users.repository";

class TypeORMUsersRepository implements UsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(params: CreateUserDTO): Promise<void> {
    const user = this.repository.create(params);

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email });
  }

  async findById(id: string): Promise<User | undefined> {
    return this.repository.findOne({ id });
  }
}

export default TypeORMUsersRepository;
