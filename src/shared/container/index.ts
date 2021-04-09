import { container } from "tsyringe";

import TypeORMUsersRepository from "@modules/accounts/externals/typeorm/repositories/users.repository";
import UsersRepository from "@modules/accounts/repositories/port/users.repository";
import TypeORMCategoryRepository from "@modules/cars/externals/typeorm/repositories/categories.repository";
import TypeORMSpecificationRepository from "@modules/cars/externals/typeorm/repositories/specifications.repository";
import CategoriesRepository from "@modules/cars/repositories/port/categories.repository";
import SpecificationsRepository from "@modules/cars/repositories/port/specifications.repository";

container.registerSingleton<CategoriesRepository>(
  "CategoriesRepository",
  TypeORMCategoryRepository
);

container.registerSingleton<SpecificationsRepository>(
  "SpecificationsRepository",
  TypeORMSpecificationRepository
);

container.registerSingleton<UsersRepository>("UsersRepository", TypeORMUsersRepository);
