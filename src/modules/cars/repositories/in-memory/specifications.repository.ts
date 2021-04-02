import Specification from "../../entities/specification";
import SpecificationsRepository, {
  CreateSpecificationParams,
} from "../port/specifications.repository";

class InMemorySpecificationRepository implements SpecificationsRepository {
  private static instance: SpecificationsRepository;

  private specifications: Specification[];

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationsRepository {
    if (!InMemorySpecificationRepository.instance) {
      InMemorySpecificationRepository.instance = new InMemorySpecificationRepository();
    }

    return InMemorySpecificationRepository.instance;
  }

  create({ name, description }: CreateSpecificationParams): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      createdAt: new Date(),
    });

    this.specifications.push(specification);
  }

  list(): Specification[] {
    return this.specifications;
  }

  findByName(name: string): Specification | undefined {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }
}

export default InMemorySpecificationRepository;
