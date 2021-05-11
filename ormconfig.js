const { SnakeNamingStrategy } = require("typeorm-naming-strategies");

module.exports = {
  "type": "postgres",
  "host": process.env.DB_HOST,
  "port": process.env.DB_PORT,
  "username": process.env.DB_USER,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_NAME,
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