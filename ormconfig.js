const { SnakeNamingStrategy } = require("typeorm-naming-strategies");
const { default: env } = require("./src/config/env");

module.exports = {
  "type": env.db.engine,
  "host": env.db.host,
  "port": env.db.port,
  "username": env.db.user,
  "password": env.db.password,
  "database": env.db.name,
  "namingStrategy": new SnakeNamingStrategy,
  "entities": [
    "./src/modules/**/entities/*.ts",
  ],
  "migrations": [
    "./src/externals/typeorm/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/externals/typeorm/migrations"
  }
}