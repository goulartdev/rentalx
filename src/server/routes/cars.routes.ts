import { Router } from "express";

import CreateCarController from "@modules/cars/usecases/create-car/create-car.controller";

const carsRoutes = Router();

const createCarsController = new CreateCarController();
carsRoutes.post("/", createCarsController.handle);

export default carsRoutes;
