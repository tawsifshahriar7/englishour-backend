const db = require("../config/database");

const User = db.define(
  "users",
  {
    username: {
      type: db.Sequelize.STRING,
      primaryKey: true,
    },
    email: {
      type: db.Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: db.Sequelize.STRING,
      allowNull: false,
    },
    token: {
      type: db.Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = User;
