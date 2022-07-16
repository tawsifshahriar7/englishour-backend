const { json } = require("express/lib/response");
const Profile = require("../model/profile");
const status_codes = require("../utils/status_code/status_code");

const profiles = async (req, res) => {
  let username = req.query.username;
  let profile = await Profile.findAll({
    where: { username: username },
  });
  return res.status(status_codes.SUCCESS).send(profile);
};

module.exports = profiles;
