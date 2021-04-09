import { Router } from "express";

import AuthenticateUserController from "@modules/accounts/usecases/authenticate-user/authenticate-user.controller";

const authRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
authRoutes.post("/authenticate", authenticateUserController.handle);

export default authRoutes;
