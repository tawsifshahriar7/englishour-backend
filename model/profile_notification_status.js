const db = require("../config/database");

const ProfileNotificationStatus = db.define("profile_notification_status", {
  notification_id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    references: {
      model: "profile_notification",
      key: "notification_id",
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
  status: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = ProfileNotificationStatus;
