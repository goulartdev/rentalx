import LocalStorageProvider from "./externals/local-storage.provider";
import S3StorageProvider from "./externals/s3-storage.provider";
import StorageProvider from "./port/storage-provider";

const storage = process.env.STORAGE_PROVIDER || "local";

type optionsType = {
  // eslint-disable-next-line prettier/prettier
  [key: string]: { new(): StorageProvider };
};

const options: optionsType = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

const instance = new options[storage]();

const getStorageProvider = (): StorageProvider => {
  return instance;
};

export default getStorageProvider;
