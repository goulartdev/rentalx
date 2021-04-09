import AppError from "@errors/app-error";
import InMemoryCategoryRepository from "@modules/cars/repositories/in-memory/categories.repository";
import CategoriesRepository from "@modules/cars/repositories/port/categories.repository";

import CreateCategory from "./create-category";

let createCategory: CreateCategory;
let categoryRepository: CategoriesRepository;

describe("Create Category", () => {
  beforeAll(() => {
    categoryRepository = InMemoryCategoryRepository.getInstance();
    createCategory = new CreateCategory(categoryRepository);
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category 1",
      description: "Category 1 description",
    };

    await createCategory.execute(category);

    const created = await categoryRepository.findByName(category.name);

    expect(created).toEqual(
      expect.objectContaining({
        ...category,
        id: expect.any(String),
        createdAt: expect.any(Date),
      })
    );
  });

  it("should not be able to create a new category if name already exists", async () => {
    expect(async () => {
      const category = {
        name: "Category 2",
        description: "Category 2 description",
      };

      await createCategory.execute(category);
      await createCategory.execute(category);
    }).rejects.toThrowError(AppError);
  });
});
