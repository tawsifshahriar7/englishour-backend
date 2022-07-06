const db = require("../config/database");

const Sentence = db.define("sentence", {
  item_id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    references: {
      model: "item",
      key: "item_id",
      onDelete: "cascade",
      onUpdate: "cascade",
      hooks: true,
    },
  },
  sentence_id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sentence: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  subject: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  wordlist: {
    type: db.Sequelize.ARRAY(db.Sequelize.STRING),
    allowNull: false,
  },
});

module.exports = ReadComplete;
