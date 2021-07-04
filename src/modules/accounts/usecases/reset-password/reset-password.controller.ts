import { Request, Response } from "express";
import { container } from "tsyringe";

import ResetPassword from "./reset-password";

class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { newPassword } = request.body;

    const resetPassword = container.resolve(ResetPassword);

    await resetPassword.execute(String(token), newPassword);

    return response.send();
  }
}

export default ResetPasswordController;
