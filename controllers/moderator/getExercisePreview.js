const { json } = require("express/lib/response");
const Exercise = require("../../model/exercise");
const item = require("../../model/item");
const letterchange = require("../../model/letterchange");
const groupwords = require("../../model/groupwords");
const words = require("../../model/words");
const fillinthegaps = require("../../model/FillInTheGaps");
const gaps = require("../../model/Gaps");
const sentenceshuffle = require("../../model/sentenceshuffle");
const ReadComplete = require("../../model/readcomplete");
const status_codes = require("../../utils/status_code/status_code");

const ExerciseDetails = async (req, res) => {
    let exercise_id = req.query.exercise_id;
    let exercise_type = req.query.exercise_type;
    console.log("in preview: ", exercise_id, exercise_type);
    let AsAWhole = "";
    let exercise = await Exercise.findOne({
        where: { exercise_id: exercise_id },
    })
    AsAWhole += exercise.dataValues.description+"###";
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
    else if(exercise_type === "categorizewords"){
        console.log("group words e achi");

        let items = await item.findAll({
            where: { exercise_id: exercise_id },
        });
        for(let item of items){
            let Category = await groupwords.findOne({
                where: { item_id: item.dataValues.item_id },
            });
            AsAWhole += Category.dataValues.group_name + "##";

            let Answers = await words.findAll({
                where: { item_id: item.dataValues.item_id },
            });

            for(let answer of Answers){
                AsAWhole += answer.dataValues.word + "#";
            }

            AsAWhole += "##";
        }
        console.log("sending asAWhole: ", AsAWhole);
        return res.status(status_codes.SUCCESS).send(AsAWhole);
    }
    else if(exercise_type === "fillgaps"){
        console.log("fill in the gaps e achi");
        let Item = await item.findOne({
            where: { exercise_id: exercise_id },
        });
        let Passage = await fillinthegaps.findOne({
            where: { item_id: Item.dataValues.item_id },
        });

        let clues = []
        const txt = Passage.dataValues.passage;
        const regExp = /\(([^)]+)\)/g;
        const matches = [...txt.match(regExp)];
        console.log(matches);
        for(let i = 0; i < matches.length; i++){
            clues.push(matches[i].replace(/[()]/g, ''));
        }
        const finalPassage = txt.replace(/ *\([^)]*\) */g, " __________ ");
        console.log(finalPassage);

        console.log(finalPassage);
        return res.status(status_codes.SUCCESS).send(finalPassage);
    }
    else if(exercise_type === "fillgapsdescription"){
        let ExerciseDesc = await Exercise.findOne({
            where: { exercise_id: exercise_id },
        });
        let finalDesc = ExerciseDesc.dataValues.description
        console.log(finalDesc);
        return res.status(status_codes.SUCCESS).send(finalDesc);
    }
    else if(exercise_type === "fillgapsanswers"){
        let Item = await item.findOne({
            where: { exercise_id: exercise_id },
        });
        let Passage = await fillinthegaps.findOne({
            where: { item_id: Item.dataValues.item_id },
        });

        let clues = []
        const txt = Passage.dataValues.passage;
        const regExp = /\(([^)]+)\)/g;
        const matches = [...txt.match(regExp)];
        console.log(matches);
        for(let i = 0; i < matches.length; i++){
            if(matches[i] !== ""){
                clues.push(matches[i].replace(/[()]/g, ''));
            }
        }
        console.log(clues);
        return res.status(status_codes.SUCCESS).send(clues);
    }

    else if(exercise_type="readcomplete")
    {
        //get the description of the exercise
        let ExerciseDesc = await Exercise.findOne({
            where: { exercise_id: exercise_id },
        });

        let desc = ExerciseDesc.dataValues.description;
        console.log("desc"+desc);
        //find the item from item table
        let Item = await item.findOne({
            where: { exercise_id: exercise_id },
        });

        //find other attributes from ReadComplete table
        let readComplete = await ReadComplete.findOne({
            where: { item_id: Item.dataValues.item_id },
        });

        let finalDesc = {
            description: desc,
            nrows: readComplete.dataValues.nrows,
            ncols: readComplete.dataValues.ncols,
            sentence_list: readComplete.dataValues.sentence_list,
            table: readComplete.dataValues.table,
        };

        console.log(finalDesc);

        return res.status(status_codes.SUCCESS).send(finalDesc);
    }
};

module.exports = ExerciseDetails;
