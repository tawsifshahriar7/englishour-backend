const db = require("../config/database");

const FillInTheGaps = db.define(
  "fillinthegaps",
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
    passage: {
      type: db.Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamp: false,
    freezeTableName: true,
  }
);

module.exports = FillInTheGaps;
