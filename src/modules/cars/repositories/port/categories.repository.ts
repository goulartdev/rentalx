import Category from "@modules/cars/entities/category";

interface CreateCategoryParams {
  name: string;
  description: string;
}

interface CategoriesRepository {
  create(params: CreateCategoryParams): Promise<void>;
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category | undefined>;
}

export { CreateCategoryParams };

export default CategoriesRepository;
