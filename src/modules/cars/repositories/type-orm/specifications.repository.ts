import { getRepository, Repository } from "typeorm";

import Specification from "@modules/cars/entities/specification";
import SpecificationsRepository, {
  CreateSpecificationParams,
} from "@modules/cars/repositories/port/specifications.repository";

class TypeORMSpecificationRepository implements SpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: CreateSpecificationParams): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    this.repository.save(specification);
  }

  async list(): Promise<Specification[]> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<Specification | undefined> {
    return this.repository.findOne({ name });
  }
}

export default TypeORMSpecificationRepository;
