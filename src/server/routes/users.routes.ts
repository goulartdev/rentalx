import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import CreateUserController from "@modules/accounts/usecases/create-user/create-user.controller";
import GetUserProfileController from "@modules/accounts/usecases/get-user-profile/get-user-profile.controller";
import UpdateUserAvatarController from "@modules/accounts/usecases/update-user-avatar/update-user-avatar.controller";

import { ensureAutheticated } from "../middlewares/ensure-authenticated";

const usersRoutes = Router();

const createUser = new CreateUserController();
usersRoutes.post("/", createUser.handle);

const uploadAvatar = multer(uploadConfig);
const updateUserAvatartController = new UpdateUserAvatarController();
usersRoutes.patch(
  "/avatar",
  ensureAutheticated,
  uploadAvatar.single("avatar"),
  updateUserAvatartController.handle
);

const getUserProfile = new GetUserProfileController();
usersRoutes.get("/profile/:userId", ensureAutheticated, getUserProfile.handle);

export default usersRoutes;
