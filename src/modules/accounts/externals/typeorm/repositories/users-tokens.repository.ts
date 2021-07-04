import { getRepository, Repository } from "typeorm";

import UserToken from "@modules/accounts/externals/typeorm/entities/user_token";
import UsersTokensRepository from "@modules/accounts/repositories/port/users-token.repository";

class TypeORMUsersTokensRepository implements UsersTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create(userToken: UserToken): Promise<UserToken> {
    return this.repository.save(userToken);
  }

  async findByUserIdAndToken(userId: string, token: string): Promise<UserToken | undefined> {
    return this.repository.findOne({ userId, refreshToken: token });
  }

  async findByToken(token: string): Promise<UserToken | undefined> {
    return this.repository.findOne({ refreshToken: token });
  }

  async deleteById(userTokenId: string): Promise<void> {
    this.repository.delete({ id: userTokenId });
  }
}

export default TypeORMUsersTokensRepository;
