import { Router } from "express";
import multer from "multer";

import CreateCategoryController from "../modules/cars/usecases/create-category/create-category.controller";
import ImportCategoriesController from "../modules/cars/usecases/import-categories/import-categories.controller";
import ListCategoriesController from "../modules/cars/usecases/list-categories/list-categories.controller";

const categoriesRoutes = Router();

const upload = multer({ dest: "./tmp" });

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post("/", createCategoryController.handle);

const listCategoriesController = new ListCategoriesController();
categoriesRoutes.get("/", listCategoriesController.handle);

const importCategoriesController = new ImportCategoriesController();
categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoriesController.handle
);

export default categoriesRoutes;
