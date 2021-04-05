import { Request, Response } from "express";
import { container } from "tsyringe";

import AuthenticateUser from "./authenticate-user";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const authenticateUser = container.resolve(AuthenticateUser);

    const { token, user } = await authenticateUser.execute({ password, email });

    return response.json({ token, user });
  }
}

export default AuthenticateUserController;
