const db = require("../config/database");

const User = db.define(
  "secret_questions",
  {
    username: {
      type: db.Sequelize.STRING,
      primaryKey: true,
      references: {
        model: "users",
        key: "username",
        onDelete: "cascade",
        onUpdate: "cascade",
        hooks: true,
      },
    },
    secret_question: {
      type: db.Sequelize.STRING,
      primaryKey: false,
      allowNull: false,
    },
    secret_answer: {
      type: db.Sequelize.STRING,
      primaryKey: false,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = User;
