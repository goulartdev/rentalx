import Category from "../../entities/category";
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

  async create({ name, description }: CreateCategoryParams): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      createdAt: new Date(),
    });

    this.categories.push(category);
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(name: string): Promise<Category | undefined> {
    return this.categories.find((category) => category.name === name);
  }
}

export default InMemoryCategoryRepository;
