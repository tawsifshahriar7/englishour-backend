const db = require("../config/database");

const Tutorial = db.define(
  "tutorial",
  {
    tutorial_id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tutorial_title: {
      type: db.Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: db.Sequelize.STRING,
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
    // topic_name: {
    //   type: db.Sequelize.STRING,
    //   allowNull: false,
    //   references: {
    //     model: "topic",
    //     key: "topic_name",
    //     onDelete: "cascade",
    //     onUpdate: "cascade",
    //     hooks: true,
    //   },
    // },

    topic_id: {
      type: db.Sequelize.INTEGER,
      allowNull: false,

      references:
      {
        model: "topic",
        key: "topic_id",
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

module.exports = Tutorial;
