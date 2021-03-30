import { repositories } from "../../repositories";
import CreateSpecification from "./create-specification";
import CreateSpecificationController from "./create-specification.controller";

const specificationRepository = repositories.getSpecificationsRepository();
const createSpecification = new CreateSpecification(specificationRepository);
const specificationController = new CreateSpecificationController(
  createSpecification
);

export default specificationController;
