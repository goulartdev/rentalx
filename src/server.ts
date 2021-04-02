import express from "express";
import swaggerUI from "swagger-ui-express";

import router from "./routes";
import swaggerConfigs from "./swagger.json";

import "./database";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerConfigs));

app.use(router);

app.listen(3000, () => console.log("Server is running on port 3000..."));
