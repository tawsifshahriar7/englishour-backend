const { json } = require("express/lib/response");
const Moderator = require("../../model/moderator");
const Exercise = require("../../model/exercise");

const status_codes = require("../../utils/status_code/status_code");

const getModeratorEx = async (req, res) => {
    console.log("ami eine");
//   let moderator_id = parseInt(req.query.moderator_id);
// let send_data = [{
//     "moderator_id": 0,
//     "moderator_name": "",
//     "added_ex_count": 0,
//     "exercise_id": 0,
//     "exercise_type": "",
//   }];

let send_data = [];

  let allEx = await Exercise.findAll({
    where: {  },
  });
  console.log("printing allEx",allEx);

  let modUnique = [];

  for(let ex of allEx){
    let ex_id = ex.dataValues.exercise_id;
    let mod_id = ex.dataValues.moderator_id;

    if(modUnique.includes(mod_id)){
      continue;
    }

    let mod = await Moderator.findOne({
        where: { moderator_id: mod_id },
      });

    if(mod.dataValues.isAdmin === "true"){ 
      continue;
    }

    let added_ex_count = 0;
    for(let tempEx of allEx){
        if(tempEx.dataValues.moderator_id == mod_id){
            added_ex_count++;
       }
    }

    send_data_one = {
        "moderator_id": mod_id,
        "moderator_name": mod.dataValues.first_name + " " + mod.dataValues.last_name,
        "added_ex_count": added_ex_count,
        "exercise_id": ex_id,
        "exercise_type": ex.dataValues.exercise_type,
    }
    send_data.push(send_data_one);

    modUnique.push(mod_id);
  }

  return res.status(status_codes.SUCCESS).send(send_data);
};

module.exports = getModeratorEx;
