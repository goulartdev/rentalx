import { Request, Response } from "express";
import { container } from "tsyringe";

import ReturnRental from "./return-rental";

class ReturnRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const returnRental = container.resolve(ReturnRental);
    const rentalId = request.params.id;

    const rental = await returnRental.execute(rentalId);

    return response.status(201).json(rental);
  }
}

export default ReturnRentalController;
