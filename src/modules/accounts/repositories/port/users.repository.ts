import User from "@modules/accounts/externals/typeorm/entities/user";

interface UsersRepository {
  save(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}

export default UsersRepository;
