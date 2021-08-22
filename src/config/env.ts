import { cleanEnv, email, str, port, num, url, bool } from "envalid";

const env = cleanEnv(process.env, {
  APP_EMAIL: email(),

  API_PORT: port(),
  API_HOST: str(),

  AUTH_TOKEN_HASH: str(),
  AUTH_TOKEN_EXPIRES_IN: num(),

  AUTH_REFRESH_TOKEN_HASH: str(),
  AUTH_REFRESH_TOKEN_EXPIRES_IN: num(),

  DB_ENGINE: str(),
  DB_HOST: str(),
  DB_PORT: port(),
  DB_NAME: str(),
  DB_USER: str(),
  DB_PASSWORD: str(),

  REDIS_HOST: str(),
  REDIS_PORT: port(),
  REDIS_PASSWORD: str(),

  SENTRY_ENABLED: bool(),
  SENTRY_DSN: url(),

  AWS_ACCESS_KEY_ID: str(),
  AWS_SECRET_ACCESS_KEY: str(),
  AWS_REGION: str(),
  AWS_BUCKET: str(),
  AWS_SES_API_VERSION: str(),

  STORAGE_PROVIDER: str({ choices: ["local", "s3"] }),
  MAIL_PROVIDER: str({ choices: ["ethereal", "ses"] }),
});

export default {
  isProd: env.isProd,
  isDev: env.isDev,
  isTest: env.isTest,

  app: {
    email: env.APP_EMAIL,
    resetPasswordUrl: `http://${env.API_HOST}:${env.API_PORT}/password/reset?token=`,
  },

  api: {
    port: env.API_PORT,
    host: env.API_HOST,
  },

  auth: {
    token: {
      hash: env.AUTH_TOKEN_HASH,
      expiresIn: env.AUTH_TOKEN_EXPIRES_IN,
    },
    refreshToken: {
      hash: env.AUTH_REFRESH_TOKEN_HASH,
      expiresIn: env.AUTH_REFRESH_TOKEN_EXPIRES_IN,
    },
  },

  db: {
    engine: env.DB_ENGINE,
    host: env.DB_HOST,
    port: env.DB_PORT,
    name: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
  },

  redis: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASSWORD,
  },

  sentry: {
    enabled: env.SENTRY_ENABLED,
    dns: env.SENTRY_DSN,
  },

  aws: {
    accessKey: {
      id: env.AWS_ACCESS_KEY_ID,
      secret: env.AWS_SECRET_ACCESS_KEY,
    },
    region: env.AWS_REGION,
    bucket: env.AWS_BUCKET,
    ses: {
      apiVersion: env.AWS_SES_API_VERSION,
    },
  },

  provider: {
    storage: env.STORAGE_PROVIDER,
    mail: env.MAIL_PROVIDER,
  },
};
