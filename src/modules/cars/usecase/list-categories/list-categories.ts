import { inject, injectable } from "tsyringe";

import Category from "../../entities/category";
import CategoriesRepository from "../../repositories/port/categories.repository";

@injectable()
class ListCategories {
  constructor(
    @inject("CategoriesRepository") private categoriesRepository: CategoriesRepository
  ) {
    //
  }

  async execute(): Promise<Category[]> {
    return this.categoriesRepository.list();
  }
}

export default ListCategories;
