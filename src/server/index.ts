import "reflect-metadata";
import express from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

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

app.use(router);
app.use(errorHandler);

// todo: colocar port em uma variável de ambiente
app.listen(3000, () => console.log("Server is running on port 3000..."));
