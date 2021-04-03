import "reflect-metadata";
import express from "express";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

import router from "./routes";

import "./database";
import "./shared/container";

const swaggerDoc = YAML.load(`${__dirname}/swagger.yaml`);

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use(router);

app.listen(3000, () => console.log("Server is running on port 3000..."));
