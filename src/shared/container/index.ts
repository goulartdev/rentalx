import { container } from "tsyringe";

import UsersRepository from "@modules/accounts/repositories/port/users.repository";
import TypeORMUsersRepository from "@modules/accounts/repositories/type-orm/users.repository";
import CategoriesRepository from "@modules/cars/repositories/port/categories.repository";
import SpecificationsRepository from "@modules/cars/repositories/port/specifications.repository";
import TypeORMCategoryRepository from "@modules/cars/repositories/type-orm/categories.repository";
import TypeORMSpecificationRepository from "@modules/cars/repositories/type-orm/specifications.repository";

container.registerSingleton<CategoriesRepository>(
  "CategoriesRepository",
  TypeORMCategoryRepository
);

container.registerSingleton<SpecificationsRepository>(
  "SpecificationsRepository",
  TypeORMSpecificationRepository
);

container.registerSingleton<UsersRepository>("UsersRepository", TypeORMUsersRepository);
