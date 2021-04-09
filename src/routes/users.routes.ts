import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import CreateUserController from "@modules/accounts/usecases/create-user/create-user.controller";
import UpdateUserAvatarController from "@modules/accounts/usecases/update-user-avatar/update-user-avatar.controller";

import { ensureAutheticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const createUser = new CreateUserController();
usersRoutes.post("/", createUser.handle);

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));
const updateUserAvatartController = new UpdateUserAvatarController();
usersRoutes.patch(
  "/avatar",
  ensureAutheticated,
  uploadAvatar.single("avatar"),
  updateUserAvatartController.handle
);

export default usersRoutes;
