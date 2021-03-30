import { Request, Response } from "express";

import ListCategories from "./list-categories";

class ListCategoriesController {
  constructor(private listCategories: ListCategories) {
    //
  }

  handle(request: Request, response: Response): Response {
    const categories = this.listCategories.execute();

    return response.json(categories);
  }
}

export default ListCategoriesController;
