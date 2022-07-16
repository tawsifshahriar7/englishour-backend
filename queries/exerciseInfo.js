const { json } = require("express/lib/response");
const Exercise = require("../model/exercise");
const status_codes = require("../utils/status_code/status_code");

const exerciseInfo = async (req, res) => {
    let moderator_id = parseInt(req.query.moderator_id);
    console.log(moderator_id);
    let exercises = await Exercise.findAll({
        where: {moderator_id: moderator_id},
    });
    console.log(exercises);
    let profileDetails = [];
    return res.status(status_codes.SUCCESS).send(exercises);
};

module.exports = exerciseInfo;