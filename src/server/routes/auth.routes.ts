import { Router } from "express";

import AuthenticateUserController from "@modules/accounts/usecases/authenticate-user/authenticate-user.controller";
import RefreshTokenController from "@modules/accounts/usecases/refresh-token/refresh-token.controller";

const authRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
authRoutes.post("/", authenticateUserController.handle);

const refreshTokenController = new RefreshTokenController();
authRoutes.post("/refresh-token", refreshTokenController.handle);

export default authRoutes;
