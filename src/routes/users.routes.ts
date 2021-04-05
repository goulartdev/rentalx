import { Router } from "express";

import CreateUserController from "../modules/accounts/usecases/create-user/create-user.controller";

const usersRoutes = Router();

const createUser = new CreateUserController();
usersRoutes.post("/", createUser.handle);

export default usersRoutes;
