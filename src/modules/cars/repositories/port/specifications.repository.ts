import Specification from "../../model/specification";

interface CreateSpecificationParams {
  name: string;
  description: string;
}

interface SpecificationsRepository {
  create(params: CreateSpecificationParams): void;
  list(): Specification[];
  findByName(name: string): Specification | undefined;
}

export { CreateSpecificationParams };

export default SpecificationsRepository;
