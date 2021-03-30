import CategoryRepository, {
  CreateCategoryParams,
} from "../../repositories/port/categories.repository";

class CreateCategory {
  constructor(private categoriesRepository: CategoryRepository) {
    //
  }

  execute({ name, description }: CreateCategoryParams): void {
    const existingCategory = this.categoriesRepository.findByName(name);

    if (existingCategory) {
      throw new Error(`A category whit the name ${name} already exists`);
    }

    this.categoriesRepository.create({ name, description });
  }
}

export default CreateCategory;
