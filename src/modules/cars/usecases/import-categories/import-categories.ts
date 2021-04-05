import csvParse from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import CategoriesRepository, {
  CreateCategoryParams,
} from "../../repositories/port/categories.repository";

@injectable()
class ImportCategories {
  constructor(
    @inject("CategoriesRepository") private categoriesRepository: CategoriesRepository
  ) {
    //
  }

  async execute(filePath: string): Promise<void> {
    const categories = await this.loadCategories(filePath);

    categories.forEach(async ({ name, description }) => {
      const existing = this.categoriesRepository.findByName(name);

      if (existing) {
        return;
      }

      this.categoriesRepository.create({ name, description });
    });
  }

  loadCategories(filePath: string): Promise<CreateCategoryParams[]> {
    return new Promise((resolve, reject) => {
      const categories: CreateCategoryParams[] = [];

      const stream = fs.createReadStream(filePath);
      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on("end", () => {
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        })
        .on("close", () => {
          fs.promises.unlink(filePath);
        });
    });
  }
}

export default ImportCategories;
