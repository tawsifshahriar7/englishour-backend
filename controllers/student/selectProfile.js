const { json } = require("express/lib/response");
const Profile = require("../../model/profile");
const status_codes = require("../../utils/status_code/status_code");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const selectProfile = async (req, res) => {
  try {
    let profile_id = parseInt(req.query.profile_id);
    let username = req.user.username;
    let profile = await Profile.findOne({
      where: { profile_id: profile_id },
    });
    if (profile.username != username) {
      return res.status(status_codes.UNAUTHORIZED).send("Unauthorized");
    } else {
      // Create token
      const token = jwt.sign(
        { profile_id: profile_id },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );
      return res.status(status_codes.SUCCESS).send(token);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = selectProfile;
