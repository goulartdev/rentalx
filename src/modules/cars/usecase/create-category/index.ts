import { repositories } from "../../repositories";
import CreateCategory from "./create-category";
import CreateCategoryController from "./create-category.controller";


export default (): CreateCategoryController => {
  const categoriesRepository = repositories.getCategoriesRepository();
  const createCategoryService = new CreateCategory(categoriesRepository);
  const createCategoryController = new CreateCategoryController(
    createCategoryService
  );

  return createCategoryController;
}
