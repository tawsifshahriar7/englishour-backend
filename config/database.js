const Sequelize = require("sequelize");

const { POSTGRES_URI } = process.env;

module.exports = new Sequelize(POSTGRES_URI, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
