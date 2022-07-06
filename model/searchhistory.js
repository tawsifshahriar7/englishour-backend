const db = require("../config/database");

const SearchHistory = db.define("search_history", {
  word: {
    type: db.Sequelize.STRING,
    primaryKey: true,
    autoIncrement: true,
    references: {
      model: "dictionary",
      key: "word",
      onDelete: "cascade",
      onUpdate: "cascade",
      hooks: true,
    },
  },
  profile_id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    references: {
      model: "profile",
      key: "profile_id",
      onDelete: "cascade",
      onUpdate: "cascade",
      hooks: true,
    },
  },
  date: {
    type: db.Sequelize.DATE,
    allowNull: true,
    defaultValue: db.Sequelize.fn("now"),
  },
});

module.exports = SearchHistory;
