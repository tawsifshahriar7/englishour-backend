const { json } = require("express/lib/response");
const Exercise = require("../../model/exercise");
const Profile = require("../../model/profile");
const status_codes = require("../../utils/status_code/status_code");

const getTestQuestions = async (req, res) => {
  const profile_id = parseInt(req.Profile.profile_id);
  Profile.findOne({
    attributes: ["current_level"],
    where: { profile_id: profile_id },
  })
    .then((level_data) => {
      const level = level_data.dataValues.current_level;
      Exercise.findAll({
        attributes: ["exercise_id"],
        where: { level: level },
      })
        .then((exercises) => {
          const exercise_ids = exercises.map((exercise) => {
            return exercise.dataValues.exercise_id;
          });
          const shuffled = exercise_ids.sort(() => 0.5 - Math.random());
          const sliced = shuffled.slice(0, 10);
          console.log(sliced);
          res.status(status_codes.SUCCESS).json(sliced);
        })
        .catch((err) => {
          res.status(status_codes.INTERNAL_SERVER_ERROR).json(err);
        });
    })
    .catch((err) => {
      res.status(status_codes.INTERNAL_SERVER_ERROR).json(err);
    });
};

module.exports = getTestQuestions;
