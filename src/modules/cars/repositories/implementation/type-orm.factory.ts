import CategoriesRepository from "../port/categories.repository";
import SpecificationsRepository from "../port/specifications.repository";
import { RepositoriesFactory } from "../repositories.factory";
import TypeORMCategoryRepository from "./categories.repository";
import TypeORMSpecificationRepository from "./specifications.repository";

class TypeORMRepositoriesFactory implements RepositoriesFactory {
  getCategoriesRepository(): CategoriesRepository {
    return new TypeORMCategoryRepository();
  }

  getSpecificationsRepository(): SpecificationsRepository {
    return new TypeORMSpecificationRepository();
  }
}

export default TypeORMRepositoriesFactory;
