import { inject, injectable } from "tsyringe";

import CategoryRepository, {
  CreateCategoryParams,
} from "@modules/cars/repositories/port/categories.repository";
import AppError from "@shared/errors/app-error";

@injectable()
class CreateCategory {
  constructor(@inject("CategoriesRepository") private categoriesRepository: CategoryRepository) {
    //
  }

  async execute({ name, description }: CreateCategoryParams): Promise<void> {
    const existingCategory = await this.categoriesRepository.findByName(name);

    if (existingCategory) {
      throw new AppError(`A category with the name ${name} already exists`, 400);
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export default CreateCategory;
