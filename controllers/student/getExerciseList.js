const { json } = require("express/lib/response");
const Exercise = require("../../model/exercise");
const Tutorial = require("../../model/tutorial");
const Profile = require("../../model/profile");
const status_codes = require("../../utils/status_code/status_code");

const Exercises = async (req, res) => {
  let topic_id = req.query.topic_id;
  let profile_id = parseInt(req.profile.profile_id);
  Tutorial.findOne({ where: { topic_id: topic_id } })
    .then((tutorial) => {
      Profile.findOne({ where: { profile_id: profile_id } })
        .then((profile) => {
          const tutorial_id = tutorial.dataValues.tutorial_id;
          const current_level = profile.dataValues.current_level;
          Exercise.findAll({
            where: { tutorial_id: tutorial_id, level: current_level },
          })
            .then((exercises) => {
              let exercise_list = [];
              for (let i = 0; i < exercises.length; i++) {
                exercise_list.push({
                  exercise_id: exercises[i].dataValues.exercise_id,
                  exercise_type: exercises[i].dataValues.exercise_type,
                });
              }
              console.log(exercise_list);
              res.status(status_codes.SUCCESS).json(exercise_list);
            })
            .catch((err) => {
              res.status(status_codes.INTERNAL_SERVER_ERROR).json(err);
            });
        })
        .catch((err) => {
          res.status(status_codes.INTERNAL_SERVER_ERROR).json(err);
        });
    })
    .catch((err) => {
      res.status(status_codes.INTERNAL_SERVER_ERROR).json(err);
    });
};

module.exports = Exercises;
