import { getRepository, Repository } from "typeorm";

import Category from "@modules/cars/externals/typeorm/entities/category";
import CategoriesRepository, {
  CreateCategoryParams,
} from "@modules/cars/repositories/port/categories.repository";

class TypeORMCategoryRepository implements CategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: CreateCategoryParams): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<Category | undefined> {
    return this.repository.findOne({ name });
  }
}

export default TypeORMCategoryRepository;
