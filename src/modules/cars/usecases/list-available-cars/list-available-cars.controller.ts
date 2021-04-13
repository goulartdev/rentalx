import { Request, Response } from "express";
import { container } from "tsyringe";
import ListAvailableCars from "./list-available-cars";

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const params = request.query;
    const listAvailableCars = container.resolve(ListAvailableCars);

    const cars = await listAvailableCars.execute(params);

    return response.json(cars);
  }
}

export default ListAvailableCarsController;