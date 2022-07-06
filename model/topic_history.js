const db = require("../config/database");

const TopicHistory = db.define("topic_history", {
  topic_id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    references: {
      model: "topic",
      key: "topic_id",
      onDelete: "cascade",
      onUpdate: "cascade",
      hooks: true,
    },
  },
  profile_id: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    references: {
      model: "profile",
      key: "profile_id",
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
});

module.exports = TopicHistory;
