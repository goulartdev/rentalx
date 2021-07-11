interface StorageProvider {
  getBaseURL(): string;
  resolve(path: string): string;
  save(file: string, folder: string): Promise<string>;
  delete(file: string, folder: string): Promise<void>;
}

export default StorageProvider;
