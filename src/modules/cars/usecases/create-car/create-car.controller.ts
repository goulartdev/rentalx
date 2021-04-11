import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateCar from "./create-car";

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCarData = request.body;
    const createCar = container.resolve(CreateCar);

    const car = await createCar.execute(createCarData);

    return response.status(201).json(car);
  }
}

export default CreateCarController;
