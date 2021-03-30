import InMemoryRepositoriesFactory from "./in-memory/in-memory.factory";
import CategoriesRepository from "./port/categories.repository";
import SpecificationsRepository from "./port/specifications.repository";

interface RepositoriesFactory {
  getCategoriesRepository: () => CategoriesRepository;
  getSpecificationsRepository: () => SpecificationsRepository;
}

const repositories = new InMemoryRepositoriesFactory();

export { repositories, RepositoriesFactory };
