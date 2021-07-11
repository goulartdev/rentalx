import { inject, injectable } from "tsyringe";

import UserMap, { UserProfileDTO } from "@modules/accounts/mapper/user.map";
import UsersRepository from "@modules/accounts/repositories/port/users.repository";
import AppError from "@shared/errors/app-error";
import StorageProvider from "@shared/providers/storage-provider/port/storage-provider";

@injectable()
class GetUserProfile {
  constructor(
    @inject("UsersRepository") private userRepository: UsersRepository,
    @inject("StorageProvider") private storageProvider: StorageProvider
  ) {
    //
  }

  async execute(userId: string): Promise<UserProfileDTO> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found");
    }

    const avatarUrl = this.storageProvider.resolve(`avatar/${user.avatar}`);
    return UserMap.toDTO(user, avatarUrl);
  }
}

export default GetUserProfile;
