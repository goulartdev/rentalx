import { inject, injectable } from "tsyringe";

import AppError from "@errors/app-error";
import SpecificationsRepository, {
  CreateSpecificationParams,
} from "@modules/cars/repositories/port/specifications.repository";

@injectable()
class CreateSpecification {
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: SpecificationsRepository
  ) {
    //
  }

  async execute({ name, description }: CreateSpecificationParams): Promise<void> {
    const existingSpecification = await this.specificationRepository.findByName(name);

    if (existingSpecification) {
      throw new AppError(`A specification whit the name ${name} already exists`, 400);
    }

    await this.specificationRepository.create({ name, description });
  }
}

export default CreateSpecification;
