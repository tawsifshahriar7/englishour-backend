const db = require("../config/database");

const Moderator = db.define(
  "moderator",
  {
    moderator_id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: db.Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: db.Sequelize.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: db.Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    first_name: {
      type: db.Sequelize.STRING,
      allowNull: true,
    },
    last_name: {
      type: db.Sequelize.STRING,
      allowNull: true,
    },
    joinDate: {
      type: db.Sequelize.DATE,
      allowNull: true,
    },
    institution: {
      type: db.Sequelize.STRING,
      allowNull: true,
    },
    designation: {
      type: db.Sequelize.STRING,
      allowNull: true,
    },
    rating: {
      type: db.Sequelize.FLOAT,
      allowNull: true,
    },
    profile_picture: {
      type: db.Sequelize.STRING,
      allowNull: true,
    },
    token: {
      type: db.Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
module.exports = Moderator;
