const { json } = require("express/lib/response");
const status_codes = require("../utils/status_code/status_code");
const Moderator = require("../model/moderator");
const bcrypt = require("bcryptjs");

const insertProfile = async (req, res) => {
    console.log(req.body);
    let moderator_id = parseInt(req.body.moderator_id);


    await Moderator.update({ 
        last_name: req.body.lastName, 
        first_name: req.body.firstName,
        email: req.body.email,
        mobile: req.body.mobile,
        designation: req.body.designation,
        // password: await bcrypt.hash(req.body.password, 10),
        joinDate: req.body.join_date,
        institution: req.body.current_institute,
        profile_picture: req.body.profileImgUrl,
    }, 
    {
        where: {
          moderator_id: moderator_id,
        }
      })
      .then((result) => {
        console.log(result);
        return res.status(status_codes.SUCCESS).send(result);
    })
    .catch((err) => {
        console.log(err);
        return res.status(status_codes.ERROR).send(err);
    });
}

module.exports = insertProfile;