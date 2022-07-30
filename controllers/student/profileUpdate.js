const { json } = require("express/lib/response");
const status_codes = require("../../utils/status_code/status_code");
const Profile = require("../../model/profile");

const updateProfile = async (req, res) => {
  data = {};
  if (req.body.firstName) {
    data.first_name = req.body.firstName;
  }
  if (req.body.lastName) {
    data.last_name = req.body.lastName;
  }
  if (req.body.dateofBirth) {
    data.dateofBirth = req.body.dateofBirth;
  }
  if (req.body.institution) {
    data.institution = req.body.institution;
  }
  if (req.body.Class) {
    data.class = req.body.Class;
  }
  await Profile.update(data, { where: { profile_id: req.profile.profile_id } })
    .then((result) => {
      console.log(result);
      return res.status(status_codes.SUCCESS).send(result);
    })
    .catch((err) => {
      console.log(err);
      return res.status(status_codes.ERROR).send(err);
    });
};

module.exports = updateProfile;
