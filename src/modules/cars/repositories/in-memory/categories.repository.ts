import Category from "../../model/category";
import CategoriesRepository, {
  CreateCategoryParams,
} from "../port/categories.repository";

class InMemoryCategoryRepository implements CategoriesRepository {
  private static instance: CategoriesRepository;

  private categories: Category[];

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!InMemoryCategoryRepository.instance) {
      InMemoryCategoryRepository.instance = new InMemoryCategoryRepository();
    }

    return InMemoryCategoryRepository.instance;
  }

  create({ name, description }: CreateCategoryParams): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      createdAt: new Date(),
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
