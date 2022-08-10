const { json } = require("express/lib/response");
const status_codes = require("../../utils/status_code/status_code");
const item = require("../../model/item");
const exercise = require("../../model/exercise");
const SentenceShuffle = require("../../model/sentenceshuffle");
const ChangeLetter = require("../../model/letterchange");

const ModeratorNotification = require("../../model/moderator_notification");
const ModeratorNotificationStatus = require("../../model/moderator_notification_status");

const insert = async (req, res) => {
  let type = req.body.type;
  let level = req.body.level;
  let tutorial_id = req.body.tutorial_id;
  let moderator_id = req.body.moderator_id;
  let description = req.body.description;
  let content = req.body.content;
  let date = req.body.date;

  console.log(req.body);

  if (type === "sentenceshuffling") {
    let correct = req.body.correct;
    let correctSentences = correct.split("#");
    let length = correctSentences.length - 1;

    let exercise_id_reference = 0;
    let notification_id_reference = 0;
    exercise
      .create({
        exercise_type: type,
        level: level,
        approval_status: "pending",
        description: description,
        moderator_id: moderator_id,
        tutorial_id: tutorial_id,
      })
      .then((result_exercise) => {
        exercise_id_reference = result_exercise.dataValues.exercise_id;
        ModeratorNotification.create({
          content: content+"#"+exercise_id_reference,
          // date: date,
          status: "pending",
        }).then((result_notification) => {
          notification_id_reference = result_notification.dataValues.notification_id;
          ModeratorNotificationStatus.create({
            notification_id: notification_id_reference,
            moderator_id: moderator_id,
          }).then((result_notification_status) => {
            console.log(result_notification_status);
          }).catch((err_notification_status) => {
            //return res.status(status_codes.ERROR).send(err_notification_status);
            console.log(err_notification_status);
          });
        }).catch((err_notification) => {
          console.log(err_notification);
          //return res.status(status_codes.ERROR).send(err_notification);
        });

        let item_id_reference = 0;
        for (let i = 0; i < length; i++) {
          item
            .create({
              exercise_id: exercise_id_reference,
            })
            .then((result_item) => {
              console.log(result_item);
              item_id_reference = result_item.dataValues.item_id;
              SentenceShuffle.create({
                item_id: item_id_reference,
                correct_sentence: correctSentences[i],
              })
                .then((result_shuffle) => {
                  console.log(result_shuffle);
                  //return res.status(status_codes.SUCCESS).send(result_shuffle);
                })
                .catch((err_shuffle) => {
                  console.log(err_shuffle);
                  return res.status(status_codes.ERROR).send(err_shuffle);
                });
              //return res.status(status_codes.SUCCESS).send(result_item);
            })
            .catch((err_item) => {
              console.log(err_item);
              return res.status(status_codes.ERROR).send(err_item);
            });
        }
        return res.status(status_codes.SUCCESS).send(result_exercise);
      })
      .catch((err_exercise) => {
        console.log(err_exercise);
        return res.status(status_codes.ERROR).send(err_exercise);
      });
  } else if (type === "changeletter") {
    let hints = req.body.hints;
    let answers = req.body.answers;

    let AllHints = hints.split("#");
    let AllAnswers = answers.split("#");

    let length = AllHints.length - 1;

    console.log(length);

    let exercise_id_reference = 0;
    exercise
      .create({
        exercise_type: type,
        level: level,
        approval_status: "pending",
        description: description,
        moderator_id: moderator_id,
        tutorial_id: tutorial_id,
      })
      .then((result_exercise) => {
        exercise_id_reference = result_exercise.dataValues.exercise_id;
        ModeratorNotification.create({
          content: content+"#"+exercise_id_reference,
          // date: date,
          status: "pending",
        }).then((result_notification) => {
          notification_id_reference = result_notification.dataValues.notification_id;
          ModeratorNotificationStatus.create({
            notification_id: notification_id_reference,
            moderator_id: moderator_id,
          }).then((result_notification_status) => {
            console.log(result_notification_status);
          }).catch((err_notification_status) => {
            console.log(err_notification_status);
            //return res.status(status_codes.ERROR).send(err_notification_status);
          });
        }).catch((err_notification) => {
          console.log(err_notification);
          //return res.status(status_codes.ERROR).send(err_notification);
        });

        let item_id_reference = 0;
        for (let i = 0; i < length; i++) {
          item
            .create({
              exercise_id: exercise_id_reference,
            })
            .then((result_item) => {
              console.log(result_item);
              item_id_reference = result_item.dataValues.item_id;
              ChangeLetter.create({
                item_id: item_id_reference,
                hint: AllHints[i],
                answer: AllAnswers[i],
              })
                .then((result_changeLetter) => {
                  console.log(result_changeLetter);
                  //return res.status(status_codes.SUCCESS).send(result_shuffle);
                })
                .catch((err_changeLetter) => {
                  console.log(err_changeLetter);
                  return res.status(status_codes.ERROR).send(err_changeLetter);
                });
              //return res.status(status_codes.SUCCESS).send(result_item);
            })
            .catch((err_item) => {
              console.log(err_item);
              return res.status(status_codes.ERROR).send(err_item);
            });
        }
        return res.status(status_codes.SUCCESS).send(result_exercise);
      })
      .catch((err_exercise) => {
        console.log(err_exercise);
        return res.status(status_codes.ERROR).send(err_exercise);
      });
  }
};

module.exports = insert;
