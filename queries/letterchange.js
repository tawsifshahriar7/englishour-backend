const { json } = require("express/lib/response");
const status_codes = require("../utils/status_code/status_code");
const Item = require("../model/item");
const LetterChange = require("../model/letterchange");

const letterchange = async (req, res) => {
  let exercise_id = parseInt(req.query.exercise_id);
  let items = await Item.findAll({
    where: {
      exercise_id: exercise_id,
    },
  });
  let letterchanges = [];
  for (let i = 0; i < items.length; i++) {
    let letterchange = await LetterChange.findAll({
      where: {
        item_id: items[i].dataValues.item_id,
      },
    });
    letterchanges.push(letterchange);
  }
  return res.status(status_codes.SUCCESS).send(letterchanges);
};

module.exports = letterchange;
