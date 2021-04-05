import { container } from "tsyringe";

import TypeORMUsersRepository from "../../modules/accounts/repositories/implementations/users.repository";
import UserRepository from "../../modules/accounts/repositories/port/users.repository";
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

container.registerSingleton<UserRepository>("UsersRepository", TypeORMUsersRepository);
