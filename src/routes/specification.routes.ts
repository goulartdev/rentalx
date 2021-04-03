import { Router } from "express";

import CreateSpecificationController from "../modules/cars/usecase/create-specification/create-specification.controller";
import ListSpecificationsController from "../modules/cars/usecase/list-specifications/list-specifications.controller";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
specificationRoutes.post("/", createSpecificationController.handle);

const listSpecificationsController = new ListSpecificationsController();
specificationRoutes.get("/", listSpecificationsController.handle);

export default specificationRoutes;
