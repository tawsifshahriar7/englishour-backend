const { json } = require("express/lib/response");
const Exercise = require("../../model/exercise");
const Profile = require("../../model/profile");
const status_codes = require("../../utils/status_code/status_code");

const getTestQuestions = async (req, res) => {
  const profile_id = 1;
  let exercise_ids = [];
  let exercises = [];
  const nums = new Set();
  while (nums.size !== 10) {
    nums.add(Math.floor(Math.random() * 10) + 1);
  }
  exercise_ids = Array.from(nums);

  const profile = Profile.findOne({
    attributes: ["current_level"],
    where: { profile_id: profile_id },
  });
  for (let i = 0; i < 10; i++) {
    const exercise = await Exercise.findOne({
      attributes: ["exercise_id"],
      where: { exercise_id: exercise_ids[i] },
    });
    exercises.push(exercise);
  }
  console.log(exercises);
  res.status(status_codes.SUCCESS).json(exercises);
};

module.exports = getTestQuestions;
