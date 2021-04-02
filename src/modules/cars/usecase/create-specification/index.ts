import { repositories } from "../../repositories";
import CreateSpecification from "./create-specification";
import CreateSpecificationController from "./create-specification.controller";

export default (): CreateSpecificationController => {
  const specificationRepository = repositories.getSpecificationsRepository();
  const createSpecification = new CreateSpecification(specificationRepository);
  const specificationController = new CreateSpecificationController(
    createSpecification
  );

  return specificationController;
};
