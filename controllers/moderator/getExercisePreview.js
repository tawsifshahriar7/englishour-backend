const { json } = require("express/lib/response");
const Exercise = require("../../model/exercise");
const item = require("../../model/item");
const letterchange = require("../../model/letterchange");
const sentenceshuffle = require("../../model/sentenceshuffle");
const status_codes = require("../../utils/status_code/status_code");

const ExerciseDetails = async (req, res) => {
    let exercise_id = req.query.exercise_id;
    let exercise_type = req.query.exercise_type;
    console.log("in preview: ", exercise_id, exercise_type);
    let AsAWhole = "";
    let exercise = await Exercise.findOne({
        where: { exercise_id: exercise_id },
    })
    AsAWhole += exercise.dataValues.description+"#";
    if(exercise_type === "letterchange"){
        let items = await item.findAll({
            where: { exercise_id: exercise_id },
        });
        for(let item of items){
            let Hint = await letterchange.findOne({
                where: { item_id: item.dataValues.item_id },
            });
            AsAWhole += Hint.dataValues.hint + "#";
        }
        console.log(AsAWhole);
        return res.status(status_codes.SUCCESS).send(AsAWhole);
    }
    else if(exercise_type === "sentenceshuffling"){
        console.log("Sentence e ashchi")
        let items = await item.findAll({
            where: { exercise_id: exercise_id },
        });
        for(let item of items){
            let Correct = await sentenceshuffle.findOne({
                where: { item_id: item.dataValues.item_id },
            });
            AsAWhole += Correct.dataValues.correct_sentence + "#";
        }
        console.log(AsAWhole);
        return res.status(status_codes.SUCCESS).send(AsAWhole);
    }
};

module.exports = ExerciseDetails;
