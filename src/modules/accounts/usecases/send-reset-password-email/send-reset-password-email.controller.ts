import { Request, Response } from "express";
import { container } from "tsyringe";

import SendResetPasswordEmail from "./send-reset-password-email";

class SendResetPasswordEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendResetPasswordEmail = container.resolve(SendResetPasswordEmail);

    await sendResetPasswordEmail.execute(email);

    return response.send();
  }
}

export default SendResetPasswordEmailController;
