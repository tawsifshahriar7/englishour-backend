const { json } = require("express/lib/response");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Exercise = require("../../model/exercise");

const status_codes = require("../../utils/status_code/status_code");

const UpdateLevel = async (req, res) => {
    console.log(req.body);
    let exercise_id = parseInt(req.body.exercise_id);
    let new_level = parseInt(req.body.new_level);

    await Exercise.update(
        {
            level: new_level,
            approval_status: "pending",
        },
        {
            where: {
                exercise_id: exercise_id,
            },
        }
    )
        
    .then((result) => {
        console.log("success");
        console.log(result);
        return res.status(status_codes.SUCCESS).send(result);
    }).catch((err) => {
        console.log("failure");
        console.log(err);
        return res.status(status_codes.ERROR).send(err);
    }
    );
}

  
  module.exports = UpdateLevel;