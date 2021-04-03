import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateSpecification from "./create-specification";

class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const createSpecification = container.resolve(CreateSpecification);

    await createSpecification.execute({ name, description });

    return response.status(201).send();
  }
}

export default CreateSpecificationController;
