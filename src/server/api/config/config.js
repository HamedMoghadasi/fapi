require("dotenv").config();

module.exports = {
  development: {
    database: "faterDb_dev2",
    username: "postgres",
    password: "0017169461hamed",
    host: "localhost",
    port: "5432",
    dialect: "postgres",
  },

  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    session: process.env.JWT_SESSION,
    exp: Math.floor(Date.now() / 1000) + 60 * 30,
    iat: Math.floor(Date.now() / 1000),
  },
};
