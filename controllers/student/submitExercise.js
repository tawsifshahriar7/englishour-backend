const { json } = require("express/lib/response");
const status_codes = require("../../utils/status_code/status_code");
const Exercise = require("../../model/exercise");
const Item = require("../../model/item");
const LetterChange = require("../../model/letterchange");
const FillInTheGaps = require("../../model/fillinthegaps");
const SentenceShuffle = require("../../model/sentenceshuffle");
const GroupWords = require("../../model/groupwords");
const Words = require("../../model/words");
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
  } else if (exercise.dataValues.exercise_type === "fillinthegaps") {
    console.log("aschi ami");
    console.log(submitted_answer);

    let count = 0;

    for (let i = 0; i < submitted_answer.referenceList.length; i++) {
      let text = submitted_answer.submission[i];
      const myArray = text.split("#");
      // console.log(submitted_answer.reference);
      console.log(
        "expected :" + submitted_answer.referenceList[parseInt(myArray[0])]
      );
      console.log(
        "found :" + submitted_answer.shuffledList[parseInt(myArray[1])]
      );

      if (
        submitted_answer.referenceList[parseInt(myArray[0])] ===
        submitted_answer.shuffledList[parseInt(myArray[1])]
      ) {
        console.log("matched");
        count++;
      } else {
        console.log("un-matched");
      }
    }

    let result = count === submitted_answer.referenceList.length ? true : false;

    for (let i = 0; i < items.length; i++) {
      let history = await History.findOne({
        where: {
          item_id: items[i].dataValues.item_id,
          profile_id: req.profile.profile_id,
        },
      });

      if (result === true) {
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

    console.log(result);
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
      let response = {};
      response.correct_sentence =
        sentenceshuffle[0].dataValues.correct_sentence;
      let history = await History.findOne({
        where: {
          item_id: items[i].dataValues.item_id,
          profile_id: req.profile.profile_id,
        },
      });
      if (
        sentenceshuffle[0].dataValues.correct_sentence === submitted_answer[i]
      ) {
        response.result = true;
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
        response.result = false;
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
      result.push(response);
    }
    return res.status(status_codes.SUCCESS).send(result);
  } else if (exercise.dataValues.exercise_type === "groupwords") {
    let correct_grouping = [];
    for (let i = 0; i < items.length; i++) {
      let groupwords = await GroupWords.findAll({
        where: {
          item_id: items[i].dataValues.item_id,
        },
      });

      for (let j = 0; j < groupwords.length; j++) {
        let words = Words.findAll({
          where: {
            item_id: groupwords[j].dataValues.item_id,
          },
        });
        for (let k = 0; k < words.length; k++) {
          correct_grouping.push({
            name: words[k].dataValues.word,
            category: groupwords[j].dataValues.group_name,
          });
        }
      }
    }
    result = [];
    for (let i = 0; i < submitted_answer.length; i++) {
      for (let j = 0; j < correct_grouping.length; j++) {
        if (submitted_answer[i].name === correct_grouping[j].name) {
          if (submitted_answer[i].category === correct_grouping[j].category) {
            result.push(true);
          } else {
            result.push(false);
          }
          break;
        }
      }
    }
    let count = 0;
    for (let i = 0; i < result.length; i++) {
      if (result[i] === true) {
        count++;
      }
    }
    let result_status = count === result.length ? true : false;
    return res.status(status_codes.SUCCESS).send(result_status);
  }
};

module.exports = verify;
