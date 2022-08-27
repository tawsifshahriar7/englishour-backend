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
  let table = [];

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
      table.push(readcomplete[0].dataValues.table[key]);
    });
  }

  let result = {
    no_rows: readcomplete[0].nrows,
    no_cols: readcomplete[0].ncols,
    sentenceList: sentences,
    first_row: table[0],
    rows: table.slice(1),
  };
  return res.status(status_codes.SUCCESS).send(result);
};

module.exports = readcomplete;
