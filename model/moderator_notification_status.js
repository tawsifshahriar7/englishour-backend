const db = require("../config/database");

const ModeratorNotificationStatus = db.define(
  "moderator_notification_status",
  {
    notification_id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      // autoIncrement: true,
      references: {
        model: "moderator_notification",
        key: "notification_id",
        onDelete: "cascade",
        onUpdate: "cascade",
        hooks: true,
      },
    },
    moderator_id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      // autoIncrement: true,
      references: {
        model: "moderator",
        key: "moderator_id",
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

module.exports = ModeratorNotificationStatus;
