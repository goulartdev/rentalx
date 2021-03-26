import { Router } from "express";

import { repositories } from "../repositories";
import CreateCategoryService from "../services/create-category.service";

const categoriesRoutes = Router();
const categoriesRepository = repositories.getCategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const createCategory = new CreateCategoryService(categoriesRepository);

  createCategory.execute({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
  const categories = categoriesRepository.list();

  return response.json(categories);
});

export default categoriesRoutes;
