import { Request, Response } from "express";

import ImportCategories from "./import-categories";

class ImportCategoriesController {
  constructor(private importCategories: ImportCategories) {
    //
  }

  handle(request: Request, response: Response): Response {
    const { file } = request;

    this.importCategories.execute(file.path);

    return response.send();
  }
}

export default ImportCategoriesController;
