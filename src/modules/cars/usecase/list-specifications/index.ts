import { repositories } from "../../repositories";
import ListSpecifications from "./list-specifications";
import ListSpecificationsController from "./list-specifications.controller";

const specificationsRepository = repositories.getSpecificationsRepository();
const listSpecifications = new ListSpecifications(specificationsRepository);
const listSpecificationsController = new ListSpecificationsController(
  listSpecifications
);

export default listSpecificationsController;
