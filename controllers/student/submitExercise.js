const { json } = require("express/lib/response");
const status_codes = require("../../utils/status_code/status_code");
const Exercise = require("../../model/exercise");
const Item = require("../../model/item");
const LetterChange = require("../../model/letterchange");
const SentenceShuffle = require("../../model/sentenceshuffle");
const History = require("../../model/history");

const verify = async (req, res) => {
  let { exercise_id, submitted_answer } = req.body;
  exercise_id = parseInt(exercise_id);
  let exercise = await Exercise.findOne({
    where: {
      exercise_id: exercise_id,
    },
  });
  let items = await Item.findAll({
    where: {
      exercise_id: exercise_id,
    },
  });
  if (exercise === null) {
    return res.status(status_codes.NOT_FOUND).send("Exercise not found");
  } else if (exercise.dataValues.exercise_type === "changeletter") {
    let result = [];
    for (let i = 0; i < items.length; i++) {
      let letterchange = await LetterChange.findAll({
        where: {
          item_id: items[i].dataValues.item_id,
        },
      });
      let history = await History.findOne({
        where: {
          item_id: items[i].dataValues.item_id,
          profile_id: req.profile.profile_id,
        },
      });
      submitted_answer[i] = submitted_answer[i].toLowerCase();
      if (letterchange[0].dataValues.answer === submitted_answer[i]) {
        result.push(true);
        if (history === null) {
          await History.create({
            item_id: items[i].dataValues.item_id,
            profile_id: req.profile.profile_id,
            status: "solved",
            nattempts: 1,
          });
        } else {
          await History.update(
            {
              status: "solved",
              nattempts: history.dataValues.nattempts + 1,
            },
            {
              where: {
                item_id: items[i].dataValues.item_id,
                profile_id: req.profile.profile_id,
              },
            }
          );
        }
      } else {
        result.push(false);
        if (history === null) {
          await History.create({
            item_id: items[i].dataValues.item_id,
            profile_id: req.profile.profile_id,
            status: "failed",
            nattempts: 1,
          });
        } else {
          await History.update(
            {
              status: "failed",
              nattempts: history.dataValues.nattempts + 1,
            },
            {
              where: {
                item_id: items[i].dataValues.item_id,
                profile_id: req.profile.profile_id,
              },
            }
          );
        }
      }
    }
    return res.status(status_codes.SUCCESS).send(result);
  } else if (exercise.dataValues.exercise_type === "sentenceshuffling") {
    let result = [];
    for (let i = 0; i < items.length; i++) {
      let sentenceshuffle = await SentenceShuffle.findAll({
        where: {
          item_id: items[i].dataValues.item_id,
        },
      });
      submitted_answer[i] = submitted_answer[i].toLowerCase();
      if (
        sentenceshuffle[0].dataValues.correct_sentence === submitted_answer[i]
      ) {
        result.push(true);
      } else {
        result.push(false);
      }
    }
    return res.status(status_codes.SUCCESS).send(result);
  }
};

module.exports = verify;
