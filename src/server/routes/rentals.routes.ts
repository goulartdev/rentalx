import { Router } from "express";
import { ensureAutheticated } from "server/middlewares/ensure-authenticated";

import CreateRentalController from "@modules/rentals/usecases/create-rental/create-rental.controller";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
rentalsRoutes.post("/", ensureAutheticated, createRentalController.handle);

export default rentalsRoutes;
