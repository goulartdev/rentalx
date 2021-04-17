import { getRepository, Repository } from "typeorm";

import Specification from "@modules/cars/externals/typeorm/entities/specification";
import SpecificationsRepository, {
  CreateSpecificationParams,
} from "@modules/cars/repositories/port/specifications.repository";

class TypeORMSpecificationRepository implements SpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: CreateSpecificationParams): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    return this.repository.save(specification);
  }

  async list(): Promise<Specification[]> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<Specification | undefined> {
    return this.repository.findOne({ name });
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.findByIds(ids);
  }
}

export default TypeORMSpecificationRepository;
