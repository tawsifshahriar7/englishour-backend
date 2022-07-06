const db = require("../config/database");

const GroupWordsHistory = db.define(
  "group_words_history",
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
    profile_id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      // autoIncrement: true,
      references: {
        model: "profile",
        key: "profile_id",
        onDelete: "cascade",
        onUpdate: "cascade",
        hooks: true,
      },
    },
    word_id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      // autoIncrement: true,
      references: {
        model: "words",
        key: "word_id",
        onDelete: "cascade",
        onUpdate: "cascade",
        hooks: true,
      },
    },
    status: {
      type: db.Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: db.Sequelize.DATE,
      allowNull: true,
      defaultValue: db.Sequelize.fn("now"),
    },
    nattempts: {
      type: db.Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamp: false,
    freezeTableName: true,
  }
);

module.exports = GroupWordsHistory;
