import "reflect-metadata";
import cors from "cors";
import express from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

import env from "@config/env";
import upload from "@config/upload";
import createConnection from "@externals/typeorm";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

import errorHandler from "./middlewares/error-handler";
import rateLimiter from "./middlewares/rate-limiter";
import router from "./routes";
import "@shared/container";
import "@shared/providers";

createConnection();

const swaggerDoc = YAML.load(`${__dirname}/../swagger.yaml`);

const app = express();

app.use(rateLimiter);

if (env.sentry.enabled) {
  Sentry.init({
    dsn: env.sentry.dns,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
  });

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
}

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use("/img", express.static(`${upload.tmpFolder}`));

app.use(cors());
app.use(router);

app.use(Sentry.Handlers.errorHandler());

app.use(errorHandler);

export default app;
