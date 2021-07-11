import { Request, Response } from "express";
import { container } from "tsyringe";

import GetUserProfile from "./get-user-profile";

class GetUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const getUserProfile = container.resolve(GetUserProfile);

    const profile = await getUserProfile.execute(userId);

    return response.status(201).json(profile);
  }
}

export default GetUserProfileController;
