const db = require("../config/database");

const Exercise = db.define(
  "exercise",
  {
    exercise_id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    exercise_type: {
      type: db.Sequelize.STRING,
      allowNull: false,
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
    description: {
      type: db.Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
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

    tutorial_id: {
      type: db.Sequelize.INTEGER,
      allowNull: false,
      references:
      {
        model: "tutorial",
        key: "tutorial_id",
        onDelete: "cascade",
        onUpdate: "cascade",
        hooks: true,
      },
    },
    moderated_by: {
      type: db.Sequelize.INTEGER,
      allowNull: true,
      references:
      {
        model: "moderator",
        key: "moderator_id",
        onDelete: "cascade",
        onUpdate: "cascade",
        hooks: true,
      },
    },
    
  },
  {
    timestamp: false,
    freezeTableName: true,
  }
);

module.exports = Exercise;
