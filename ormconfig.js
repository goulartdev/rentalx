const SnakeNamingStrategy = require("typeorm-naming-strategies").SnakeNamingStrategy

module.exports = {
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "rentalx",
  "password": "rentalx",
  "database": "rentalx",
  "namingStrategy": new SnakeNamingStrategy,
  "entities": [
    "./src/modules/**/entities/*.ts",
  ],
  "migrations": [
    "./src/database/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}