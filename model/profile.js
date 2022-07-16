const db = require("../config/database");

const Profile = db.define(
  "profile",
  {
    profile_id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: db.Sequelize.STRING,
      allowNull: false,
      unique: false,
      references: {
        model: "users",
        key: "username",
        onDelete: "cascade",
        onUpdate: "cascade",
        hooks: true,
      },
    },
    first_name: {
      type: db.Sequelize.STRING,
      allowNull: true,
    },
    last_name: {
      type: db.Sequelize.STRING,
      allowNull: true,
    },
    dateofBirth: {
      type: db.Sequelize.DATE,
      allowNull: true,
    },
    institution: {
      type: db.Sequelize.STRING,
      allowNull: true,
    },
    class: {
      type: db.Sequelize.STRING,
      allowNull: true,
    },
    profile_picture: {
      type: db.Sequelize.STRING,
      allowNull: true,
    },
    current_level: {
      type: db.Sequelize.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
module.exports = Profile;
