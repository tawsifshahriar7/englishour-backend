const { json } = require("express/lib/response");
const Exercise = require("../../model/exercise");
const status_codes = require("../../utils/status_code/status_code");

const getEntryTest = async (req, res) => {
  let ex_id_list = [];
  const max_level = await Exercise.max("level");
  for (let i = 1; i <= max_level; i++) {
    let ex_list = await Exercise.findAll({
      attributes: ["exercise_id", "exercise_type"],
      where: {
        level: i,
      },
      limit: 2,
    });
    ex_id_list = ex_id_list.concat(
      ex_list.map((ex) => {
        return {
          exercise_id: ex.dataValues.exercise_id,
          exercise_type: ex.dataValues.exercise_type,
        };
      })
    );
  }
  const shuffled = ex_id_list.sort(() => 0.5 - Math.random());
  console.log(ex_id_list);
  res.status(status_codes.SUCCESS).json(shuffled);
};

module.exports = getEntryTest;
