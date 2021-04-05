import { Request, Response } from "express";
import { container } from "tsyringe";

import ImportCategories from "./import-categories";

class ImportCategoriesController {
  handle(request: Request, response: Response): Response {
    const { file } = request;
    const importCategories = container.resolve(ImportCategories);

    importCategories.execute(file.path);

    return response.status(201).send();
  }
}

export default ImportCategoriesController;
