import UserToken from "@modules/accounts/externals/typeorm/entities/user_token";

import { UsersTokensRepository } from "../port/users-token.repository";

class InMemoryUsersTokensRepository implements UsersTokensRepository {
  private static instance: UsersTokensRepository;

  private usersTokens: UserToken[];

  private constructor() {
    this.usersTokens = [];
  }

  public static getInstance(): UsersTokensRepository {
    if (!InMemoryUsersTokensRepository.instance) {
      InMemoryUsersTokensRepository.instance = new InMemoryUsersTokensRepository();
    }

    return InMemoryUsersTokensRepository.instance;
  }

  async create(userToken: UserToken): Promise<UserToken> {
    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndToken(userId: string, token: string): Promise<UserToken | undefined> {
    return this.usersTokens.find(
      (userToken) => userToken.userId === userId && userToken.refreshToken === token
    );
  }

  async deleteById(userTokenId: string): Promise<void> {
    const index = this.usersTokens.findIndex((otherUserToken) => otherUserToken.id === userTokenId);
    this.usersTokens.splice(index);
  }
}

export default InMemoryUsersTokensRepository;
