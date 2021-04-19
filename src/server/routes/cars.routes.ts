import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import AddImagesToCarController from "@modules/cars/usecases/add-images-to-car/add-images-to-car.controller";
import AddSpecificationsToCarController from "@modules/cars/usecases/add-specifications-to-car/add-specifications-to-car.controller";
import CreateCarController from "@modules/cars/usecases/create-car/create-car.controller";
import ListAvailableCarsController from "@modules/cars/usecases/list-available-cars/list-available-cars.controller";

import ensureIsAdmin from "../middlewares/ensure-admin";

const carsRoutes = Router();

const carImagesUpload = multer(uploadConfig.upload("./tmp/cars"));

const createCarsController = new CreateCarController();
carsRoutes.post("/", ensureIsAdmin, createCarsController.handle);

const listAvailableCars = new ListAvailableCarsController();
carsRoutes.get("/available", listAvailableCars.handle);

const addSpecificationsToCarController = new AddSpecificationsToCarController();
carsRoutes.post("/:id/specifications", ensureIsAdmin, addSpecificationsToCarController.handle);

const addImagesToCarController = new AddImagesToCarController();
carsRoutes.post(
  "/:id/images",
  ensureIsAdmin,
  carImagesUpload.array("images"),
  addImagesToCarController.handle
);

export default carsRoutes;
