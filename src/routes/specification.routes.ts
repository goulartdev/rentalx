import { Router } from "express";

import specificationController from "../modules/cars/usecase/create-specification";
import listSpecificationsController from "../modules/cars/usecase/list-specifications";

const specificationRoutes = Router();

specificationRoutes.post("/", (request, response) => {
  return specificationController.handle(request, response);
});

specificationRoutes.get("/", (request, response) => {
  return listSpecificationsController.handle(request, response);
});

export default specificationRoutes;
