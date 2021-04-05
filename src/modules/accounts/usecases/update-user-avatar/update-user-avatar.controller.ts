import { Request, Response } from "express";
import { container } from "tsyringe";

import UpdateUserAvatar from "./update-user-avatar";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const avatarFile = request.file.filename;
    const updateUserAvatar = container.resolve(UpdateUserAvatar);

    updateUserAvatar.execute({ userId: id, avatarFile });

    return response.status(204).send();
  }
}

export default UpdateUserAvatarController;
