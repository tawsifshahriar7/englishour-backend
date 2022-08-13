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
    let readcompletes = [];
    for (let i = 0; i < items.length; i++) {
        let readcomplete = await ReadComplete.findAll({
        where: {
            item_id: items[i].dataValues.item_id,
        },
        });
        readcompletes.push(readcomplete);
    }
    return res.status(status_codes.SUCCESS).send(readcompletes);
}

module.exports = readcomplete;