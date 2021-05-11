import { inject, injectable } from "tsyringe";

import Category from "@modules/cars/externals/typeorm/entities/category";
import CategoriesRepository from "@modules/cars/repositories/port/categories.repository";

@injectable()
class ListCategories {
  constructor(@inject("CategoriesRepository") private categoriesRepository: CategoriesRepository) {
    //
  }

  async execute(): Promise<Category[]> {
    return this.categoriesRepository.list();
  }
}

export default ListCategories;
