const db = require("../config/database");

const ReadComplete = db.define(
  "readcomplete",
  {
    item_id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      // autoIncrement: true,
      references: {
        model: "item",
        key: "item_id",
        onDelete: "cascade",
        onUpdate: "cascade",
        hooks: true,
      },
    },
    nrows: {
      type: db.Sequelize.INTEGER,
      allowNull: false,
    },
    ncols: {
      type: db.Sequelize.INTEGER,
      allowNull: false,
    },

    sentence_list:
    {
      //type= json
      type: db.Sequelize.JSON,
      allowNull: false,
    },

    table:
    {
      //type= json
      type: db.Sequelize.JSON,
      allowNull: false,
    }

  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = ReadComplete;
