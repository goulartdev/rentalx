import User from "../../entities/user";

interface CreateUserDTO {
  name: string;
  password: string;
  email: string;
  driverLicense: string;
  id?: string;
  avatar?: string;
}

interface UserRepository {
  create(params: CreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}

export { CreateUserDTO };

export default UserRepository;
