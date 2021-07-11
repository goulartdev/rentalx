import { S3 } from "aws-sdk";
import fs from "fs";
import mime from "mime";
import { resolve } from "path";

import upload from "@config/upload";
import AppError from "@shared/errors/app-error";
import { deleteFile } from "@utils/file";

import StorageProvider from "../port/storage-provider";

class S3StorageProvider implements StorageProvider {
  // todo: user variáveis de ambiente
  private static BASE_URL = "https://rentalx-123.s3.sa-east-1.amazonaws.com";

  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_REGION,
    });
  }

  getBaseURL(): string {
    return S3StorageProvider.BASE_URL;
  }

  resolve(path: string): string {
    return `${S3StorageProvider.BASE_URL}/${path}`;
  }

  async save(file: string, folder: string): Promise<string> {
    const path = resolve(upload.tmpFolder, file);

    const content = await fs.promises.readFile(path);
    const contentType = mime.getType(path);

    if (!contentType) {
      throw new AppError("File not found");
    }

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
        ACL: "public-read",
        Body: content,
        ContentType: contentType,
      })
      .promise();

    await deleteFile(path);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
      })
      .promise();
  }
}

export default S3StorageProvider;
