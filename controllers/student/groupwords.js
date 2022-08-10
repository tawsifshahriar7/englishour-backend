const { json } = require("express/lib/response");
const status_codes = require("../../utils/status_code/status_code");
const Item = require("../../model/item");
const GroupWords = require("../../model/groupwords");
const Words = require("../../model/words");

const groupwords = async (req, res) => {
  let exercise_id = parseInt(req.query.exercise_id);
  let items = await Item.findAll({
    where: {
      exercise_id: exercise_id,
    },
  });
  let categoryList = [];
  let wordList = [];
  for (let i = 0; i < items.length; i++) {
    let categories = await GroupWords.findAll({
      where: {
        item_id: items[i].dataValues.item_id,
      },
    });
    for (let j = 0; j < categories.length; j++) {
      categoryList.push(categories[j].dataValues.group_name);
    }
    let words = await Words.findAll({
      where: {
        item_id: items[i].dataValues.item_id,
      },
    });
    for (let k = 0; k < words.length; k++) {
      wordList.push(words[k].dataValues.word);
    }
  }
  let result = {
    categoryList: categoryList,
    wordList: wordList,
  };
  return res.status(status_codes.SUCCESS).send(result);
};

module.exports = groupwords;
