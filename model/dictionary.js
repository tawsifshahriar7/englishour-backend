const db = require("../config/database");

const Dictionary = db.define("dictionary", {
  word: {
    type: db.Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  definition: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  example: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  phonetics: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  synonyms: {
    type: db.Sequelize.ARRAY(db.Sequelize.STRING),
    allowNull: true,
  },
});

module.exports = Dictionary;
