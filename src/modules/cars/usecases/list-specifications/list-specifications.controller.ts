import { Request, Response } from "express";
import { container } from "tsyringe";

import ListSpecifications from "./list-specifications";

class ListSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSpecifications = container.resolve(ListSpecifications);

    const specifications = await listSpecifications.execute();

    return response.json(specifications);
  }
}

export default ListSpecificationsController;
