require("dotenv").config();

module.exports = {
  development: {
    database: "sequa",
    username: "sequa_hamed",
    password: "0017169461hamed",
    host: "localhost",
    port: "5432",
    dialect: "postgres"
  },

  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: "postgres"
  }
};
