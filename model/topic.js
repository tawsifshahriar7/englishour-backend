const db = require("../config/database");

const Topic = db.define(
  "topic",
  {
    topic_id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    topic_name: {
      type: db.Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    category_id: {
      type: db.Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "category",
        key: "category_id",
        onDelete: "cascade",
        onUpdate: "cascade",
        hooks: true,
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Topic;
