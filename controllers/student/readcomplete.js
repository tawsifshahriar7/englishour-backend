const { json } = require("express/lib/response");
const status_codes = require("../../utils/status_code/status_code");
const Item = require("../../model/item");
const ReadComplete = require("../../model/readcomplete");

const readcomplete = async (req, res) => {
  let exercise_id = parseInt(req.query.exercise_id);
  let items = await Item.findAll({
    where: {
      exercise_id: exercise_id,
    },
  });
  let sentences = [];
  let rows = [];
  for (let i = 0; i < items.length; i++) {
    let readcomplete = await ReadComplete.findAll({
      where: {
        item_id: items[i].dataValues.item_id,
      },
    });

    Object.keys(readcomplete[0].dataValues.sentence_list).forEach((key) => {
      sentences.push(readcomplete[0].dataValues.sentence_list[key]);
    });

    Object.keys(readcomplete[0].dataValues.table).forEach((key) => {
      rows.push(readcomplete[0].dataValues.table[key]);
    });
  }
  let result = {
    sentenceList: sentences,
    rowList: rows,
  };
  return res.status(status_codes.SUCCESS).send(result);
};

module.exports = readcomplete;
