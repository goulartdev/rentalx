import { repositories } from "../../repositories";
import ImportCategories from "./import-categories";
import ImportCategoriesController from "./import-categories.controller";

const categoriesRepository = repositories.getCategoriesRepository();
const importCategories = new ImportCategories(categoriesRepository);
const importCategoriesController = new ImportCategoriesController(
  importCategories
);

export default importCategoriesController;
