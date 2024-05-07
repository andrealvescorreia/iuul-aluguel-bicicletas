require("dotenv").config();

module.exports = {
  development: {
    dialect: "postgres",
    database: process.env.DATABASE_NAME || "bicicletario",
    username: process.env.DATABASE_USER || "postgres",
    password: process.env.DATABASE_PASSWORD || "postgres",
    host: process.env.DATABASE_HOST || "localhost",
  },
  test: {
    dialect: "postgres",
    database: process.env.DATABASE_NAME || "bicicletario",
    username: process.env.DATABASE_USER || "postgres",
    password: process.env.DATABASE_PASSWORD || "postgres",
    host: process.env.DATABASE_HOST || "localhost",
  },
  production: {
    dialect: "postgres",
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
  },
};
