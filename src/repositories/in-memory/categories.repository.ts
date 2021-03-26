import Category from "../../model/category";
import CategoryRepository, {
  CreateCategoryParams,
} from "../categories.repository";

class InMemoryCategoryRepository implements CategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: CreateCategoryParams): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category | undefined {
    return this.categories.find((category) => category.name === name);
  }
}

export default InMemoryCategoryRepository;
