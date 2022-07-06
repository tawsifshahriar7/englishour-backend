const db = require("../config/database");

const GroupWords = db.define(
  "groupwords",
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
    group_name: {
      type: db.Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamp: false,
    freezeTableName: true,
  }
);

module.exports = GroupWords;
