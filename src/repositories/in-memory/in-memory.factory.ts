import CategoryRepository from "../categories.repository";
import { RepositoriesFactory } from "../repositories.factory";
import InMemoryCategoryRepository from "./categories.repository";

const categoriesRepository = new InMemoryCategoryRepository();

class InMemoryRepositoriesFactory implements RepositoriesFactory {
  getCategoriesRepository(): CategoryRepository {
    return categoriesRepository;
  }
}

export default InMemoryRepositoriesFactory;
