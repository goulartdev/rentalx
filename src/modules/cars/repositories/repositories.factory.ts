import TypeORMRepositoriesFactory from "./implementation/type-orm.factory";
import CategoriesRepository from "./port/categories.repository";
import SpecificationsRepository from "./port/specifications.repository";

interface RepositoriesFactory {
  getCategoriesRepository: () => CategoriesRepository;
  getSpecificationsRepository: () => SpecificationsRepository;
}

const repositories = new TypeORMRepositoriesFactory();

export { repositories, RepositoriesFactory };
