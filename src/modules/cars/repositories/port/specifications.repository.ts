import Specification from "@modules/cars/externals/typeorm/entities/specification";

interface CreateSpecificationParams {
  name: string;
  description: string;
}

interface SpecificationsRepository {
  // todo: rename to save
  create(params: CreateSpecificationParams): Promise<Specification>;
  list(): Promise<Specification[]>;
  findByName(name: string): Promise<Specification | undefined>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { CreateSpecificationParams };

export default SpecificationsRepository;
