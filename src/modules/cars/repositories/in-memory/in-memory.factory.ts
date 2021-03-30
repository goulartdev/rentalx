import CategoriesRepository from "../port/categories.repository";
import SpecificationsRepository from "../port/specifications.repository";
import { RepositoriesFactory } from "../repositories.factory";
import InMemoryCategoryRepository from "./categories.repository";
import InMemorySpecificationRepository from "./specifications.repository";

class InMemoryRepositoriesFactory implements RepositoriesFactory {
  getCategoriesRepository(): CategoriesRepository {
    return InMemoryCategoryRepository.getInstance();
  }

  getSpecificationsRepository(): SpecificationsRepository {
    return InMemorySpecificationRepository.getInstance();
  }
}

export default InMemoryRepositoriesFactory;
