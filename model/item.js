const db = require("../config/database");

const Item = db.define("item", {
  item_id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  exercise_id: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "exercise",
      key: "exercise_id",
      onDelete: "cascade",
      onUpdate: "cascade",
      hooks: true,
    },
  },
});

module.exports = Item;
