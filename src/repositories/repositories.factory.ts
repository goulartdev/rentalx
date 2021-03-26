import CategoryRepository from "./categories.repository";
import InMemoryRepositoriesFactory from "./in-memory/in-memory.factory";

interface RepositoriesFactory {
  getCategoriesRepository: () => CategoryRepository;
}

const repositories = new InMemoryRepositoriesFactory();

export { repositories, RepositoriesFactory };
