import "reflect-metadata";
import cors from "cors";
import express from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

import upload from "@config/upload";
import createConnection from "@externals/typeorm";

import errorHandler from "./middlewares/error-handler";
import router from "./routes";
import "@shared/container";
import "@shared/providers";

createConnection();

const swaggerDoc = YAML.load(`${__dirname}/../swagger.yaml`);

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use("/img", express.static(`${upload.tmpFolder}`));

app.use(cors());
app.use(router);
app.use(errorHandler);

export default app;
