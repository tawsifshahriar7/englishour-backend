const { json } = require("express/lib/response");
const status_codes = require("../utils/status_code/status_code");
const item = require("../model/item");
const exercise = require("../model/exercise");
const SentenceShuffle = require("../model/sentenceshuffle");

const insert = async (req, res) => {
    let type = req.body.type;
    let level = req.body.level;
    let topic = req.body.topic;
    let correct = req.body.correct;
    let shuffled = req.body.shuffled;
    let description = req.body.description;
    let moderator_id = req.body.moderator_id;

    let correctSentences = correct.split("#");
    let shuffledSentences = shuffled.split("#");

    console.log(req.body);

    if(type==="sentenceshuffling"){
        let exercise_id_reference = 0;
        console.log("end of exercise creation"+exercise_id_reference);
        exercise.create({
            type: type,
            level: level,
            approval_status: "pending",
            description: description,
            moderator_id: moderator_id,
            topic_id: topic,
      })
      .then((result) => {
        console.log("In exercise then"+result);
        exercise_id_reference = result.dataValues.id;
        let item_id_reference = 0;
        for(let i=0; i<correctSentences.length; i++){
            item.create({
                exercise_id: exercise_id_reference,
            })
            .then((result) => {
                console.log(result);
                item_id_reference = result.dataValues.id;
                SentenceShuffle.create({
                    item_id: item_id_reference,
                    correct_sentence: correctSentences[i],
                    shuffled_sentence: shuffledSentences[i],
                })
                .then((result) => {
                    console.log(result);
                    return res.status(status_codes.ERROR).send(err);
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(status_codes.ERROR).send(err);
                });
            })
            .catch((err) => {
                console.log(err);
                return res.status(status_codes.ERROR).send(err);
            });
        }
        return res.status(status_codes.SUCCESS).send(result);
      })
      .catch((err) => {
        console.log("Error");
        return res.status(status_codes.ERROR).send(err);
      });
    }
};

module.exports = insert;