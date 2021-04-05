import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

import AppError from "./errors/app-error";
import router from "./routes";
import "./database";
import "./shared/container";

const swaggerDoc = YAML.load(`${__dirname}/swagger.yaml`);

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use(router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  return response
    .status(500)
    .json({ status: "Error", message: `Internal server error: ${err.message}` });
});

app.listen(3000, () => console.log("Server is running on port 3000..."));
