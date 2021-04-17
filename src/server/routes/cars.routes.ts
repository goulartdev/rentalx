import { Router } from "express";
import ensureIsAdmin from "server/middlewares/ensure-admin";

import AddSpecificationsToCarController from "@modules/cars/usecases/add-specifications-to-car/add-specifications-to-car.controller";
import CreateCarController from "@modules/cars/usecases/create-car/create-car.controller";
import ListAvailableCarsController from "@modules/cars/usecases/list-available-cars/list-available-cars.controller";

const carsRoutes = Router();

const createCarsController = new CreateCarController();
carsRoutes.post("/", ensureIsAdmin, createCarsController.handle);

const listAvailableCars = new ListAvailableCarsController();
carsRoutes.get("/available", listAvailableCars.handle);

const addSpecificationsToCarController = new AddSpecificationsToCarController();
carsRoutes.post(
  "/:id/specifications",
  ensureIsAdmin,
  addSpecificationsToCarController.handle
);

export default carsRoutes;
