const { json } = require("express/lib/response");
const status_codes = require("../utils/status_code/status_code");
const Item = require("../model/item");
const SentenceShuffle = require("../model/sentenceshuffle");

const sentenceshuffle = async (req, res) => {
  let exercise_id = parseInt(req.query.exercise_id);
  let items = await Item.findAll({
    where: {
      exercise_id: exercise_id,
    },
  });
  let sentenceshuffles = [];
  for (let i = 0; i < items.length; i++) {
    let sentenceshuffle = await SentenceShuffle.findAll({
      where: {
        item_id: items[i].dataValues.item_id,
      },
    });
    sentenceshuffles.push(sentenceshuffle);
  }
  return res.status(status_codes.SUCCESS).send(sentenceshuffles);
};

module.exports = sentenceshuffle;
