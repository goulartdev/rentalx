import { inject, injectable } from "tsyringe";

import UsersRepository from "@modules/accounts/repositories/port/users.repository";
import AppError from "@shared/errors/app-error";
import { deleteFile } from "@utils/file";

interface UpdateUserAvatarParams {
  userId: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatar {
  constructor(@inject("UsersRepository") private usersRepository: UsersRepository) {
    //
  }

  async execute({ userId, avatarFile }: UpdateUserAvatarParams): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found");
    }

    if (user.avatar) {
      // todo: put this path into a constant in somewhere
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatarFile;

    await this.usersRepository.save(user);
  }
}

export default UpdateUserAvatar;
