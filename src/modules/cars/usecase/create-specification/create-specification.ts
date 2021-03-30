import SpecificationsRepository, {
  CreateSpecificationParams,
} from "../../repositories/port/specifications.repository";

class CreateSpecification {
  constructor(private specificationRepository: SpecificationsRepository) {
    //
  }

  execute({ name, description }: CreateSpecificationParams): void {
    const existingSpecification = this.specificationRepository.findByName(name);

    if (existingSpecification) {
      throw new Error(`A specification whit the name ${name} already exists`);
    }

    this.specificationRepository.create({ name, description });
  }
}

export default CreateSpecification;
