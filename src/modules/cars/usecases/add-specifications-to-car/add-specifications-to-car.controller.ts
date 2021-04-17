import { Request, Response } from "express";
import { container } from "tsyringe";

import AddSpecificationsToCar from "./add-specifications-to-car";

class AddSpecificationsToCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: carId } = request.params;
    const { specificationsIds } = request.body;
    const addSpecificationToCar = container.resolve(AddSpecificationsToCar);

    const car = await addSpecificationToCar.execute({ carId, specificationsIds });

    return response.json(car);
  }
}

export default AddSpecificationsToCarController;
