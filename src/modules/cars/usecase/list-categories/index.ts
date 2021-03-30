import { repositories } from "../../repositories";
import ListCategories from "./list-categories";
import ListCategoriesController from "./list-categories.controller";

const categoriesRepository = repositories.getCategoriesRepository();
const listCategories = new ListCategories(categoriesRepository);
const listCategoriesController = new ListCategoriesController(listCategories);

export default listCategoriesController;
