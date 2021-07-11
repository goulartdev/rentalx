import fs from "fs";
import { resolve } from "path";

import upload from "@config/upload";
import { deleteFile } from "@utils/file";

import StorageProvider from "../port/storage-provider";

class LocalStorageProvider implements StorageProvider {
  // todo: user variáveis de ambiente
  private static BASE_URL = "http://localhost:3000/img";

  getBaseURL(): string {
    return LocalStorageProvider.BASE_URL;
  }

  resolve(path: string): string {
    return `${LocalStorageProvider.BASE_URL}/${path}`;
  }

  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file)
    );

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);
    await deleteFile(filename);
  }
}

export default LocalStorageProvider;
