const db = require("../config/database");

const Category = db.define(
  "category",
  {
    category_id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: db.Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamp: false,
    freezeTableName: true,
  }
);

module.exports = Category;
