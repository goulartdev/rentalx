import { container } from "tsyringe";

import TypeORMUsersRepository from "@modules/accounts/externals/typeorm/repositories/users.repository";
import UsersRepository from "@modules/accounts/repositories/port/users.repository";
import TypeORMCarsRepository from "@modules/cars/externals/typeorm/repositories/cars.repository";
import TypeORMCategoryRepository from "@modules/cars/externals/typeorm/repositories/categories.repository";
import TypeORMSpecificationRepository from "@modules/cars/externals/typeorm/repositories/specifications.repository";
import CarsRepository from "@modules/cars/repositories/port/cars.repository";
import CategoriesRepository from "@modules/cars/repositories/port/categories.repository";
import SpecificationsRepository from "@modules/cars/repositories/port/specifications.repository";
import TypeORMRentalsRepository from "@modules/rentals/externals/typeorm/repositories/rentals.repository";
import RentalsRepository from "@modules/rentals/repositories/ports/rentals.repository";

container.registerSingleton<CategoriesRepository>(
  "CategoriesRepository",
  TypeORMCategoryRepository
);
container.registerSingleton<SpecificationsRepository>(
  "SpecificationsRepository",
  TypeORMSpecificationRepository
);
container.registerSingleton<UsersRepository>("UsersRepository", TypeORMUsersRepository);
container.registerSingleton<CarsRepository>("CarsRepository", TypeORMCarsRepository);
container.registerSingleton<RentalsRepository>("RentalsRepository", TypeORMRentalsRepository);
