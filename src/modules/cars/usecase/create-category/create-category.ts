import CategoryRepository, {
  CreateCategoryParams,
} from "../../repositories/port/categories.repository";

class CreateCategory {
  constructor(private categoriesRepository: CategoryRepository) {
    //
  }

  async execute({ name, description }: CreateCategoryParams): Promise<void> {
    const existingCategory = await this.categoriesRepository.findByName(name);

    if (existingCategory) {
      throw new Error(`A category whit the name ${name} already exists`);
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export default CreateCategory;
