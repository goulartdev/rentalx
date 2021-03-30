import Category from "../../model/category";

interface CreateCategoryParams {
  name: string;
  description: string;
}

interface CategoriesRepository {
  create(params: CreateCategoryParams): void;
  list(): Category[];
  findByName(name: string): Category | undefined;
}

export { CreateCategoryParams };

export default CategoriesRepository;
