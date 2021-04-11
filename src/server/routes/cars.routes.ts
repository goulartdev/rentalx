import { Router } from "express";
import ensureIsAdmin from "server/middlewares/ensure-admin";

import CreateCarController from "@modules/cars/usecases/create-car/create-car.controller";

const carsRoutes = Router();

const createCarsController = new CreateCarController();
carsRoutes.post("/", ensureIsAdmin, createCarsController.handle);

export default carsRoutes;
