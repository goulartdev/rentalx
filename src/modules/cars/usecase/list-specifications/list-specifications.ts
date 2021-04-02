import Specification from "../../entities/specification";
import SpecificationsRepository from "../../repositories/port/specifications.repository";

class ListSpecifications {
  constructor(private specificationsRepository: SpecificationsRepository) {
    //
  }

  execute(): Specification[] {
    return this.specificationsRepository.list();
  }
}

export default ListSpecifications;
