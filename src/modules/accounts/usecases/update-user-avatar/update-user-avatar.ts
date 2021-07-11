import { inject, injectable } from "tsyringe";

import UsersRepository from "@modules/accounts/repositories/port/users.repository";
import AppError from "@shared/errors/app-error";
import StorageProvider from "@shared/providers/storage-provider/port/storage-provider";

interface UpdateUserAvatarParams {
  userId: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatar {
  constructor(
    @inject("UsersRepository") private usersRepository: UsersRepository,
    @inject("StorageProvider") private storageProvider: StorageProvider
  ) {
    //
  }

  async execute({ userId, avatarFile }: UpdateUserAvatarParams): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found");
    }

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, "avatar");
    }

    await this.storageProvider.save(avatarFile, "avatar");

    user.avatar = avatarFile;

    await this.usersRepository.save(user);
  }
}

export default UpdateUserAvatar;
