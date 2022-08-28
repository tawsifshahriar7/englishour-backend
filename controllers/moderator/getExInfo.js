const { json } = require("express/lib/response");
const Exercise = require("../../model/exercise");
const status_codes = require("../../utils/status_code/status_code");

const ExerciseDetails = async (req, res) => {
  let ExDetails = ""
  console.log(req.query.exercise_id);
  exercise_id = req.query.exercise_id.split("x");
  for(let i=0;i<exercise_id.length-1;i++){
    let exercise = await Exercise.findOne({
      where: { exercise_id: parseInt(exercise_id[i]) },
    });
    ExDetails+=exercise.dataValues.exercise_type+"#";
  }
  return res.status(status_codes.SUCCESS).send(ExDetails);
};

module.exports = ExerciseDetails;
