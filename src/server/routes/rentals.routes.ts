import { Router } from "express";

import CreateRentalController from "@modules/rentals/usecases/create-rental/create-rental.controller";
import ListRentalsByUserController from "@modules/rentals/usecases/list-rentals-by-user/list-rentals-by-user.controller";
import ReturnRentalController from "@modules/rentals/usecases/return-rental/return-rental.controller";
import { ensureAutheticated } from "@server/middlewares/ensure-authenticated";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
rentalsRoutes.post("/", ensureAutheticated, createRentalController.handle);

const returnRentalController = new ReturnRentalController();
rentalsRoutes.post("/return/:id", ensureAutheticated, returnRentalController.handle);

const listByUserController = new ListRentalsByUserController();
rentalsRoutes.get("/", ensureAutheticated, listByUserController.handle);

export default rentalsRoutes;
