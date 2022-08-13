const { json } = require("express/lib/response");
const status_codes = require("../../utils/status_code/status_code");
const Item = require("../../model/item");
const FillInTheGaps = require("../../model/FillInTheGaps");

const fillinthegaps = async (req, res) => {
 
  let exercise_id = parseInt(req.query.exercise_id);
  let items = await Item.findOne({
    where: {
      exercise_id: exercise_id,
    },
  });
  //let fillinthegaps = [];
  //for (let i = 0; i < items.length; i++) {
    let fillinthegaps = await FillInTheGaps.findOne({
      where: {
        item_id: items.dataValues.item_id,
      },
    });
    //console.log(fillinthegaps.dataValues.passage);
    //fillinthegaps.push(fillinthegaps);
 // }
  
  return res.status(status_codes.SUCCESS).send(fillinthegaps.dataValues.passage);
};

module.exports = fillinthegaps;
