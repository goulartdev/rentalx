import { repositories } from "../../repositories";
import ListCategories from "./list-categories";
import ListCategoriesController from "./list-categories.controller";

export default (): ListCategoriesController => {
  const categoriesRepository = repositories.getCategoriesRepository();
  const listCategories = new ListCategories(categoriesRepository);
  const listCategoriesController = new ListCategoriesController(listCategories);

  return listCategoriesController;
};
