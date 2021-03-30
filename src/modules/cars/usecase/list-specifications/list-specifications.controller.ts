import { Request, Response } from "express";

import ListSpecifications from "./list-specifications";

class ListSpecificationsController {
  constructor(private listSpecifications: ListSpecifications) {
    //
  }

  handle(request: Request, response: Response): Response {
    const specifications = this.listSpecifications.execute();
    return response.json(specifications);
  }
}

export default ListSpecificationsController;
