import { inject, injectable } from "tsyringe";

import SpecificationsRepository, {
  CreateSpecificationParams,
} from "../../repositories/port/specifications.repository";

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
      throw new Error(`A specification whit the name ${name} already exists`);
    }

    await this.specificationRepository.create({ name, description });
  }
}

export default CreateSpecification;
