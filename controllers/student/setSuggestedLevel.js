const { json } = require("express/lib/response");
const status_codes = require("../../utils/status_code/status_code");
const Profile = require("../../model/profile");

const setSuggestedLevel = async (req, res) => {
  const profile_id = parseInt(req.profile.profile_id);
  const selectedLevel = req.body.selectedLevel;
  Profile.update(
    {
      current_level: selectedLevel,
    },
    {
      where: { profile_id: profile_id },
    }
  )
    .then(() => {
      res.status(status_codes.SUCCESS).json({
        message: "Suggested level updated successfully.",
      });
    })
    .catch((err) => {
      res.status(status_codes.INTERNAL_SERVER_ERROR).json(err);
    });
};

module.exports = setSuggestedLevel;
