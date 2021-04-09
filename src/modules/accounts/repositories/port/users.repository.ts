import User from "@modules/accounts/entities/user";

interface CreateUserDTO {
  name: string;
  password: string;
  email: string;
  driverLicense: string;
  id?: string;
  avatar?: string;
}

interface UsersRepository {
  create(params: CreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}

export { CreateUserDTO };

export default UsersRepository;
