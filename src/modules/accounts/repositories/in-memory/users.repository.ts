import User from "@modules/accounts/entities/user";
import UsersRepository, {
  CreateUserDTO,
} from "@modules/accounts/repositories/port/users.repository";

class InMemoryUsersRepository implements UsersRepository {
  private static instance: UsersRepository;

  private users: User[];

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!InMemoryUsersRepository.instance) {
      InMemoryUsersRepository.instance = new InMemoryUsersRepository();
    }

    return InMemoryUsersRepository.instance;
  }

  async create(params: CreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, params);

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
}

export default InMemoryUsersRepository;
