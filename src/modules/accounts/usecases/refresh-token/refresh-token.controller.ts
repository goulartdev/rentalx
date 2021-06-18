import { Request, Response } from "express";
import { container } from "tsyringe";

import RefreshToken from "./refresh-token";

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token = request.body.token || request.headers["x-access-token"] || request.query.token;

    const refreshToken = container.resolve(RefreshToken);

    const newToken = await refreshToken.execute(token);

    return response.json(newToken);
  }
}

export default RefreshTokenController;
