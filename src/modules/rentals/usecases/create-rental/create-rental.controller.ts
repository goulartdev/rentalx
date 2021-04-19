import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateRental from "./create-rental";

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { carId, pickUpDate, expectedDropOffDate } = request.body;
    const { user } = request;

    const createRental = container.resolve(CreateRental);

    const rental = await createRental.execute({
      userId: user.id,
      carId,
      pickUpDate,
      expectedDropOffDate,
    });

    return response.json(rental);
  }
}

export default CreateRentalController;
