import { inject, injectable } from "tsyringe";

import Specification from "@modules/cars/entities/specification";
import SpecificationsRepository from "@modules/cars/repositories/port/specifications.repository";

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
