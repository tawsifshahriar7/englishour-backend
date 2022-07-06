const db = require("../config/database");

const ModeratorNotification = db.define("moderator_notification", {
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
});

module.exports = ModeratorNotification;
