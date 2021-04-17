import Category from "@modules/cars/externals/typeorm/entities/category";

interface CreateCategoryParams {
  name: string;
  description: string;
}

interface CategoriesRepository {
  // todo: rename to save
  create(params: CreateCategoryParams): Promise<void>;
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category | undefined>;
}

export { CreateCategoryParams };

export default CategoriesRepository;
