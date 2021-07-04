import UserToken from "@modules/accounts/externals/typeorm/entities/user_token";

interface UsersTokensRepository {
  create(userToken: UserToken): Promise<UserToken>;
  findByUserIdAndToken(userId: string, token: string): Promise<UserToken | undefined>;
  findByToken(token: string): Promise<UserToken | undefined>;
  deleteById(userTokenId: string): Promise<void>;
}

export default UsersTokensRepository;
