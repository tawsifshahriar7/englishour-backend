const { json } = require("express/lib/response");
const status_codes = require("../utils/status_code/status_code");
const moderator = require("../model/moderator");

const insertProfile = async (req, res) => {
    console.log(req.body);

    moderator.create({
        mobile: req.body.mobile,
        email: req.body.email,
        password: req.body.password,
        isAdmin: "false",
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        joinDate: req.body.join_date,
        institution: req.body.current_institute,
        designation: req.body.designation,
        rating: req.body.rating,
        profile_picture: req.body.profileImgUrl,
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