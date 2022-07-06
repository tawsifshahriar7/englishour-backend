const db = require("../config/database");

const Exercise = db.define("exercise", {
  exercise_id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  level: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
  approval_status: {
    type: db.Sequelize.STRING,
    allowNull: false,
    defaultValue: "pending",
  },
  moderator_id: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "moderator",
      key: "moderator_id",
      onDelete: "cascade",
      onUpdate: "cascade",
      hooks: true,
    },
  },
  topic_id: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "topic",
      key: "topic_id",
      onDelete: "cascade",
      onUpdate: "cascade",
      hooks: true,
    },
  },
});

module.exports = Exercise;
