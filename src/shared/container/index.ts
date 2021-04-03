import { container } from "tsyringe";

import TypeORMCategoryRepository from "../../modules/cars/repositories/implementation/categories.repository";
import TypeORMSpecificationRepository from "../../modules/cars/repositories/implementation/specifications.repository";
import CategoriesRepository from "../../modules/cars/repositories/port/categories.repository";
import SpecificationsRepository from "../../modules/cars/repositories/port/specifications.repository";

container.registerSingleton<CategoriesRepository>(
  "CategoriesRepository",
  TypeORMCategoryRepository
);

container.registerSingleton<SpecificationsRepository>(
  "SpecificationsRepository",
  TypeORMSpecificationRepository
);
