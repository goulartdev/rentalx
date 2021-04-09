import Specification from "@modules/cars/entities/specification";
import SpecificationsRepository, {
  CreateSpecificationParams,
} from "@modules/cars/repositories/port/specifications.repository";

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

  async create({ name, description }: CreateSpecificationParams): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      createdAt: new Date(),
    });

    this.specifications.push(specification);
  }

  async list(): Promise<Specification[]> {
    return this.specifications;
  }

  async findByName(name: string): Promise<Specification | undefined> {
    return this.specifications.find((specification) => specification.name === name);
  }
}

export default InMemorySpecificationRepository;
