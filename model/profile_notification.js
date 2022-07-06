const db = require("../config/database");

const ProfileNotification = db.define(
  "profile_notification",
  {
    notification_id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: db.Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: db.Sequelize.DATE,
      allowNull: true,
      defaultValue: db.Sequelize.fn("now"),
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = ProfileNotification;
