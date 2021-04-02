import { Request, Response } from "express";

import CreateCategory from "./create-category";

class CreateCategoryController {
  constructor(private createCategory: CreateCategory) {
    //
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    await this.createCategory.execute({ name, description });

    return response.status(201).send();
  }
}

export default CreateCategoryController;
