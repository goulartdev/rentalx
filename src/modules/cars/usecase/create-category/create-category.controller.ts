import { Request, Response } from "express";

import CreateCategory from "./create-category";

class CreateCategoryController {
  constructor(private createCategory: CreateCategory) {
    //
  }

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    this.createCategory.execute({ name, description });

    return response.status(201).send();
  }
}

export default CreateCategoryController;
