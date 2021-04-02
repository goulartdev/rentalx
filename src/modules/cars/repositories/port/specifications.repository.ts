import Specification from "../../entities/specification";

interface CreateSpecificationParams {
  name: string;
  description: string;
}

interface SpecificationsRepository {
  create(params: CreateSpecificationParams): Promise<void>;
  list(): Promise<Specification[]>;
  findByName(name: string): Promise<Specification | undefined>;
}

export { CreateSpecificationParams };

export default SpecificationsRepository;
