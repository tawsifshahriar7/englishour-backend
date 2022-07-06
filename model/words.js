const db = require("../config/database");

const Words = db.define(
  "words",
  {
    item_id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      // autoIncrement: true,
      references: {
        model: "item",
        key: "item_id",
        onDelete: "cascade",
        onUpdate: "cascade",
        hooks: true,
      },
    },
    word_id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    word: {
      type: db.Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Words;
