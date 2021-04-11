import { Router } from "express";

import CreateSpecificationController from "@modules/cars/usecases/create-specification/create-specification.controller";
import ListSpecificationsController from "@modules/cars/usecases/list-specifications/list-specifications.controller";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
specificationsRoutes.post("/", createSpecificationController.handle);

const listSpecificationsController = new ListSpecificationsController();
specificationsRoutes.get("/", listSpecificationsController.handle);

export default specificationsRoutes;
