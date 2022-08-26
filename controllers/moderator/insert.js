const { json } = require("express/lib/response");
const status_codes = require("../../utils/status_code/status_code");
const item = require("../../model/item");
const exercise = require("../../model/exercise");
const SentenceShuffle = require("../../model/sentenceshuffle");
const ChangeLetter = require("../../model/letterchange");
const GroupWords = require("../../model/groupwords");
const Words = require("../../model/words");
const FillInTheGaps = require("../../model/FillInTheGaps");
const Gaps = require("../../model/Gaps");

const ReadComplete = require("../../model/readcomplete");
const Moderator = require("../../model/moderator");

const ModeratorNotification = require("../../model/moderator_notification");
const ModeratorNotificationStatus = require("../../model/moderator_notification_status");

const insert = async (req, res) => {
  let type = req.body.type;
  let level = req.body.level;
  let tutorial_id = req.body.tutorial_id;
  let moderator_id = req.body.moderator_id;
  let description = req.body.description;
  let content = req.body.content;

  console.log("type: "+type);
  console.log("level: "+level);
  console.log("tutorial_id: "+tutorial_id);
  console.log("moderator_id: "+moderator_id);
  console.log("description: "+description);
  console.log("content: "+content);

  function delay(delayInms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }
  delay(1000);


  let moderator_ids_in_exercise = [];
  let moderator_ids_in_moderator = [];
  let moderator_status_in_moderator = [];
  let selected_moderator_for_review = 0;
  let assignment_count = 99999;
  let temp_count = 0;
  let exerciseDetails = await exercise.findAll({
    where: {},
  });
  for (let eachExercise of exerciseDetails) {
    moderator_ids_in_exercise.push(eachExercise.dataValues.moderated_by);
  }
  console.log("moderator ids in exercise: ", moderator_ids_in_exercise);

  let moderatorDetails = await Moderator.findAll({
    where: {},
  });
  for (let eachModerator of moderatorDetails) {
    moderator_ids_in_moderator.push(eachModerator.dataValues.moderator_id);
    moderator_status_in_moderator.push(eachModerator.dataValues.isAdmin);
  }
  console.log("moderator ids in moderator: ", moderator_ids_in_moderator);
  for(let i=0;i<moderator_ids_in_moderator.length;i++){
    for(let j=0;j<moderator_ids_in_exercise.length;j++){
      if(moderator_ids_in_moderator[i] === moderator_ids_in_exercise[j]){
        temp_count++;
      }
    }
    console.log("temp_count: ",temp_count);
    if(temp_count < assignment_count && moderator_ids_in_moderator[i] !== moderator_id && moderator_status_in_moderator[i] === false){
      assignment_count = temp_count;
      selected_moderator_for_review = moderator_ids_in_moderator[i];
      console.log("selected_moderator_for_review: ",selected_moderator_for_review, assignment_count);
    }
    temp_count = 0;
  }

  console.log("selected_moderator_for_review: ", selected_moderator_for_review);

  if (type === "sentenceshuffling") {
    let correct = req.body.correct;
    let correctSentences = correct.split("#");
    let length = correctSentences.length - 1;

    let exercise_id_reference = 0;
    exercise
      .create({
        exercise_type: type,
        level: level,
        approval_status: "pending",
        description: description,
        moderator_id: moderator_id,
        tutorial_id: tutorial_id,
        moderated_by: selected_moderator_for_review,
      })
      .then((result_exercise) => {
        exercise_id_reference = result_exercise.dataValues.exercise_id;
        ModeratorNotification.create({
          content: content+"#"+exercise_id_reference+"#"+moderator_id,
          // date: date,
          status: "pending",
        }).then((result_notification) => {
          console.log(result_notification)
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
  }

  else if (type === "changeletter") {
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
        moderated_by: selected_moderator_for_review,
      })
      .then((result_exercise) => {
        exercise_id_reference = result_exercise.dataValues.exercise_id;
        ModeratorNotification.create({
          content: content+"#"+exercise_id_reference+"#"+moderator_id,
          // date: date,
          status: "pending",
        }).then((result_notification) => {
          console.log(result_notification)
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
  else if(type === "categorizewords"){


    let hints = req.body.hints;
    let answers = req.body.answers;

    let AllHints = hints.split("#");
    let AllAnswers = answers.split("###");

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
        moderated_by: selected_moderator_for_review,
      })
      .then((result_exercise) => {
        console.log("In categorize exercise then" + result_exercise);
        exercise_id_reference = result_exercise.dataValues.exercise_id;
        ModeratorNotification.create({
          content: content+"#"+exercise_id_reference+"#"+moderator_id,
          // date: date,
          status: "pending",
        }).then((result_notification) => {
          console.log(result_notification)
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
              GroupWords.create({
                item_id: item_id_reference,
                group_name: AllHints[i],
                createdAt: Date.now(),
                updatedAt: Date.now(),
              })
                .then((result_groupWords) => {
                  
                  let answer_list = AllAnswers[i].split("#");

                  for(let j = 0; j < answer_list.length; j++){
                    Words.create({
                      item_id: result_groupWords.dataValues.item_id,
                      word: answer_list[j],
                    })
                    .then((words_item) => {
                      console.log("words_item created", words_item);
                    })
                    .catch((err_words) => {
                      console.log("error in word item");
                      console.log(err_words);
                      return res.status(status_codes.ERROR).send(err_words);
                    });
                  }
                 
                  console.log(result_groupWords);
                  //return res.status(status_codes.SUCCESS).send(result_shuffle);
                })
                .catch((err_groupWords) => {
                  console.log(err_groupWords);
                  return res.status(status_codes.ERROR).send(err_groupWords);
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

  else if (type === "readcomplete")
  {
    let nrows = req.body.nrows;
    let ncols = req.body.ncols;
    let description = req.body.description;
    let moderator_id = req.body.moderator_id;
    let tutorial_id = req.body.tutorial_id;
    let level = req.body.level;
    let sentence_list = req.body.sentence_list;
    let table = req.body.table;

    //create a new exercise
    let exercise_id_reference = 0;

    exercise
      .create({
        exercise_type: type,
        level: level,
        approval_status: "pending",
        description: description,
        moderator_id: moderator_id,
        tutorial_id: tutorial_id,
        moderated_by: selected_moderator_for_review,
      })
      .then((result_exercise) => {


        console.log("In exercise then" + result_exercise);
        exercise_id_reference = result_exercise.dataValues.exercise_id;
        ModeratorNotification.create({
          content: content+"#"+exercise_id_reference+"#"+moderator_id,
          // date: date,
          status: "pending",
        }).then((result_notification) => {
          console.log(result_notification)
        }).catch((err_notification) => {
          console.log(err_notification);
          //return res.status(status_codes.ERROR).send(err_notification);
        });

        //create a new item
        let item_id_reference = 0;
        item
          .create({
            exercise_id: exercise_id_reference,
          })
          .then((result_item) => {
            console.log("In item then" + result_item);
            item_id_reference = result_item.dataValues.item_id;

            //create a new readcomplete
            ReadComplete.create({
              item_id: item_id_reference,
              nrows: nrows,
              ncols: ncols,
              sentence_list: sentence_list,
              table: table,
            })
              .then((result_readcomplete) => {
                console.log("In readcomplete then" + result_readcomplete);
                return res.status(status_codes.SUCCESS).send(result_readcomplete);
              })
              .catch((err_readcomplete) => {
                console.log(err_readcomplete);
                return res.status(status_codes.ERROR).send(err_readcomplete);
              }

              );
          })
          .catch((err_item) => {
            console.log(err_item);
            return res.status(status_codes.ERROR).send(err_item);
          }
          );
      })
      .catch((err_exercise) => {
        console.log(err_exercise);
        return res.status(status_codes.ERROR).send(err_exercise);
      });
  }
  else if(type === "fillgaps"){
    let passage = req.body.passage;
    console.log(passage);
    let answers = []
    const txt = passage;
    const regExp = /\(([^)]+)\)/g;
    const matches = [...txt.match(regExp)];
    console.log(matches);
    for(let i = 0; i < matches.length; i++){
      answers.push(matches[i].replace(/[()]/g, ''));
    }
    console.log(answers);
    console.log(answers.length);

    let exercise_id_reference = 0;
    exercise
      .create({
        exercise_type: type,
        level: level,
        approval_status: "pending",
        description: description,
        moderator_id: moderator_id,
        tutorial_id: tutorial_id,
        moderated_by: selected_moderator_for_review,
      })
      .then((result_exercise) => {
        exercise_id_reference = result_exercise.dataValues.exercise_id;
        ModeratorNotification.create({
          content: content+"#"+exercise_id_reference+"#"+moderator_id,
          status: "pending",
        }).then((result_notification) => {
          console.log(result_notification)
        }).catch((err_notification) => {
          console.log(err_notification);
        });
        let item_id_reference = 0;
        item
          .create({
            exercise_id: exercise_id_reference,
          })
          .then((result_item) => {
            console.log(result_item);
            item_id_reference = result_item.dataValues.item_id;
            FillInTheGaps.create({
              item_id: item_id_reference,
              passage: passage,
            })
              .then((result_fillinthegaps) => {
                console.log(result_fillinthegaps);
                for(let i = 0; i < answers.length; i++){
                  Gaps
                    .create({
                      item_id: item_id_reference,
                      gapWord: answers[i],
                    })
                    .then((result_gaps) => {
                      console.log(result_gaps);
                    }).catch((err_gaps) => {
                      console.log(err_gaps);
                    });
                }
              }).catch((err_fillinthegaps) => {
                console.log(err_fillinthegaps);
              });
          })
          .catch((err_item) => {
            console.log(err_item);
          });
          return res.status(status_codes.SUCCESS).send(result_exercise);
      })
      .catch((err_exercise) => {
        console.log(err_exercise);
        return res.status(status_codes.ERROR).send(err_exercise);
      });
  }
};

module.exports = insert;
