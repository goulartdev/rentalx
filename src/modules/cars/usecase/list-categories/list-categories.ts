import Category from "../../model/category";
import CategoriesRepository from "../../repositories/port/categories.repository";

class ListCategories {
  constructor(private categoriesRepository: CategoriesRepository) {
    //
  }

  execute(): Category[] {
    return this.categoriesRepository.list();
  }
}

export default ListCategories;
