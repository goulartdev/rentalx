import { repositories } from "../../repositories";
import CreateCategory from "./create-category";
import CreateCategoryController from "./create-category.controller";

const categoriesRepository = repositories.getCategoriesRepository();
const createCategoryService = new CreateCategory(categoriesRepository);
const createCategoryController = new CreateCategoryController(
  createCategoryService
);

export default createCategoryController;
