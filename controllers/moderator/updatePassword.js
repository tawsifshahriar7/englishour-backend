const { json } = require("express/lib/response");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Moderator = require("../../model/moderator");
const status_codes = require("../../utils/status_code/status_code");

const UpdatePassword = async (req, res) => {
    console.log(req.body);
    let moderator_id = parseInt(req.body.moderator_id);
  
    await Moderator.update(
      {
        password: await bcrypt.hash(req.body.password, 10),
      },
      {
        where: {
          moderator_id: moderator_id,
        },
      }
    )
      .then((result) => {
        console.log(result);
        return res.status(status_codes.SUCCESS).send(result);
      })
      .catch((err) => {
        console.log(err);
        return res.status(status_codes.ERROR).send(err);
      });
  };
  
  module.exports = UpdatePassword;