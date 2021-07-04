import { Router } from "express";

import ResetPasswordController from "@modules/accounts/usecases/reset-password/reset-password.controller";
import SendResetPasswordEmailController from "@modules/accounts/usecases/send-reset-password-email/send-reset-password-email.controller";

const passwordRoutes = Router();

const sendResetPasswordMailController = new SendResetPasswordEmailController();
passwordRoutes.post("/forgot", sendResetPasswordMailController.handle);

const resetPasswordController = new ResetPasswordController();
passwordRoutes.post("/reset", resetPasswordController.handle);

export default passwordRoutes;
