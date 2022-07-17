const { json } = require("express/lib/response");
const status_codes = require("../utils/status_code/status_code");
const Profile = require("../model/profile");

const createProfile = async (req, res) => {
  await Profile.create({
    username: req.body.username,
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    dateofBirth: req.body.dateofBirth,
    institution: req.body.institution,
    // class: req.body.class,
  })
    .then((result) => {
      console.log(result);
      return res.status(status_codes.SUCCESS).send(result);
    })
    .catch((err) => {
      console.log(err);
      return res.status(status_codes.ERROR).send(err);
    });
};

module.exports = createProfile;
