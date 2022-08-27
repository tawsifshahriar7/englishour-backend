const { json } = require("express/lib/response");
const status_codes = require("../../utils/status_code/status_code");
const Profile = require("../../model/profile");

const TestSubmission = async (req, res) => {
  const profile_id = req.profile.profile_id;
  let results = req.body.results;
  let correct_count = 0;
  for (let i = 0; i < results.length; i++) {
    if (results[i] === "correct") {
      correct_count++;
    }
  }
  let percentage = (correct_count / results.length) * 100;
  if (percentage >= 80) {
    Profile.findOne({
      attributes: ["current_level"],
      where: { profile_id: profile_id },
    })
      .then((profile) => {
        let current_level = profile.dataValues.current_level;
        let new_level = current_level + 1;
        Profile.update(
          {
            current_level: new_level,
          },
          {
            where: { profile_id: profile_id },
          }
        )
          .then(() => {
            res.status(status_codes.SUCCESS).json({
              message:
                "Congratulations! You have successfully passed the test.",
              new_level: new_level,
            });
          })
          .catch((err) => {
            res.status(status_codes.INTERNAL_SERVER_ERROR).json({
              message: "Something went wrong. Please try again.",
            });
          });
      })
      .catch((err) => {
        res.status(status_codes.INTERNAL_SERVER_ERROR).json({
          message: "Something went wrong. Please try again.",
        });
      });
  } else {
    res.status(status_codes.SUCCESS).json({
      message: "You have failed the test.",
      percentage: percentage,
    });
  }
};

module.exports = TestSubmission;
