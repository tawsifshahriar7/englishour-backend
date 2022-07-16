const { json } = require("express/lib/response");
const Profile = require("../model/profile");
const status_codes = require("../utils/status_code/status_code");

const profileInfo = async (req, res) => {
  let profile_id = parseInt(req.query.profile_id);
  let profile = await Profile.findOne({
    where: { profile_id: profile_id },
  });
  return res.status(status_codes.SUCCESS).send(profile);
};

module.exports = profileInfo;
