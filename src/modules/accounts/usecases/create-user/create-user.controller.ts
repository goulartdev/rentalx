import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateUser from "./create-user";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, driverLicense } = request.body;
    const createUser = container.resolve(CreateUser);

    await createUser.execute({ name, email, password, driverLicense });

    return response.status(201).send();
  }
}

export default CreateUserController;
