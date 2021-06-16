import { Request, Response } from "express";
import { container } from "tsyringe";

import ListRentalByUserUseCase from "./list-rentals-by-user";

class ListRentalsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const listRentalsByUser = container.resolve(ListRentalByUserUseCase);

    const rentals = await listRentalsByUser.execute(userId);

    return response.json(rentals);
  }
}

export default ListRentalsByUserController;
