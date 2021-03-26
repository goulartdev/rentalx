import CategoryRepository, {
  CreateCategoryParams,
} from "../repositories/categories.repository";

class CreateCategoryService {
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

export default CreateCategoryService;
