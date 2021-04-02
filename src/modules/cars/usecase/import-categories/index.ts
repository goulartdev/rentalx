import { repositories } from "../../repositories";
import ImportCategories from "./import-categories";
import ImportCategoriesController from "./import-categories.controller";

export default (): ImportCategoriesController => {
  const categoriesRepository = repositories.getCategoriesRepository();
  const importCategories = new ImportCategories(categoriesRepository);
  const importCategoriesController = new ImportCategoriesController(importCategories);

  return importCategoriesController;
};
