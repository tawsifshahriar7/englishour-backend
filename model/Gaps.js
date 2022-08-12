const db = require("../config/database");

const Gaps = db.define(
  "gaps",
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
    gap_id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    gapWord: {
      type: db.Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Gaps;
