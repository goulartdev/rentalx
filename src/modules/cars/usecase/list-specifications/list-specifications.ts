import { inject, injectable } from "tsyringe";

import Specification from "../../entities/specification";
import SpecificationsRepository from "../../repositories/port/specifications.repository";

@injectable()
class ListSpecifications {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: SpecificationsRepository
  ) {
    //
  }

  async execute(): Promise<Specification[]> {
    return this.specificationsRepository.list();
  }
}

export default ListSpecifications;
