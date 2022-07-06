const db = require("../config/database");

const LetterChange = db.define(
  "letterchange",
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
    hint: {
      type: db.Sequelize.STRING,
      allowNull: false,
    },
    answer: {
      type: db.Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = LetterChange;
