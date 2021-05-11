import { Router } from "express";

import CreateRentalController from "@modules/rentals/usecases/create-rental/create-rental.controller";
import { ensureAutheticated } from "@server/middlewares/ensure-authenticated";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
rentalsRoutes.post("/", ensureAutheticated, createRentalController.handle);

export default rentalsRoutes;
