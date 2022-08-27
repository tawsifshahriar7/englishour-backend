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
// const fs = require("fs");

const insertFromFile = async (req, res) => {
    console.log("Inserting from file");
    console.log("Length: ", req.body.length);
    // return res.status(status_codes.SUCCESS).send("Done");
    for(let e=1;e<req.body.length;e++){
        let type = req.body[e].type;
        let level = req.body[e].level;
        let tutorial_id = req.body[e].tutorial_id;
        let moderator_id = req.body[e].moderator_id;
        let description = req.body[e].Description;

        

        console.log("type: "+type);
        console.log("level: "+level);
        console.log("tutorial_id: "+tutorial_id);
        console.log("moderator_id: "+moderator_id);
        console.log("description: "+description)

        let moderator_ids_in_exercise = [];
        let moderator_ids_in_moderator = [];
        let moderator_status_in_moderator = [];
        let selected_moderator_for_review = 0;
        let assignment_count = 9999;
        let temp_count = 0;
        let exerciseDetails = await exercise.findAll({
            where: {},
        });
        for (let eachExercise of exerciseDetails) {
            moderator_ids_in_exercise.push(eachExercise.dataValues.moderated_by);
        }
        console.log("moderator ids in exercise: ", moderator_ids_in_exercise, e);

        let moderatorDetails = await Moderator.findAll({
            where: {},
        });
        for (let eachModerator of moderatorDetails) {
            moderator_ids_in_moderator.push(eachModerator.dataValues.moderator_id);
            moderator_status_in_moderator.push(eachModerator.dataValues.isAdmin);
        }
        for(let i=0;i<moderator_ids_in_moderator.length;i++){
            for(let j=0;j<moderator_ids_in_exercise.length;j++){
                if(moderator_ids_in_moderator[i] === moderator_ids_in_exercise[j]){
                    temp_count++;
                }
            }
            console.log("temp_count: ",temp_count, i);
            if(temp_count < assignment_count && moderator_ids_in_moderator[i] !== moderator_id && moderator_status_in_moderator[i] === false){
                assignment_count = temp_count;
                selected_moderator_for_review = moderator_ids_in_moderator[i];
                console.log("selected_moderator_for_review: ",selected_moderator_for_review, assignment_count);
            }
            temp_count = 0;
        }

        console.log("selected_moderator_for_review: ", selected_moderator_for_review);

        if (type === "sentenceshuffling") {
            let correct = req.body[e].CorrectSentences;
            let correctSentences = correct.split("#");
            let length = correctSentences.length - 1;
            let content = "A sentence shuffling exercise is uploaded";
        
            let exercise_id_reference = 0;
            exercise.create({
                exercise_type: type,
                level: level,
                approval_status: "pending",
                description: description,
                moderator_id: moderator_id,
                tutorial_id: tutorial_id,
                moderated_by: parseInt(selected_moderator_for_review),
              })
              .then((result_exercise) => {
                // console.log(result_exercise);
                exercise_id_reference = result_exercise.dataValues.exercise_id;
                ModeratorNotification.create({
                  content: content+"#"+exercise_id_reference+"#"+moderator_id,
                  // date: date,
                  status: "pending",
                }).then((result_notification) => {
                //   console.log(result_notification)
                }).catch((err_notification) => {
                  console.log(err_notification);
                  //return res.status(status_codes.ERROR).send(err_notification);
                });
        
                let item_id_reference = 0;
                for (let i = 0; i < length; i++) {
                    item.create({
                        exercise_id: exercise_id_reference,
                    })
                    .then((result_item) => {
                        // console.log(result_item);
                        item_id_reference = result_item.dataValues.item_id;
                        SentenceShuffle.create({
                            item_id: item_id_reference,
                            correct_sentence: correctSentences[i],
                        })
                        .then((result_shuffle) => {
                            // console.log(result_shuffle);
                            //return res.status(status_codes.SUCCESS).send(result_shuffle);
                        })
                        .catch((err_shuffle) => {
                            console.log(err_shuffle);
                            // return res.status(status_codes.ERROR).send(err_shuffle);
                        });
                        //return res.status(status_codes.SUCCESS).send(result_item);
                    })
                    .catch((err_item) => {
                        console.log(err_item);
                        // return res.status(status_codes.ERROR).send(err_item);
                    });
                }
                // return res.status(status_codes.SUCCESS).send(result_exercise);
            })
            .catch((err_exercise) => {
                console.log(err_exercise);
                // return res.status(status_codes.ERROR).send(err_exercise);
            });
        }
        else if (type === "changeletter") {
            let hints = req.body[e].Hints;
            let answers = req.body[e].Answers;
            let AllHints = hints.split("#");
            let AllAnswers = answers.split("#");
            let length = AllHints.length - 1;
            let content = "A change letter exercise is uploaded";
        
            let exercise_id_reference = 0;
            exercise.create({
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
                    // console.log(result_notification)
                }).catch((err_notification) => {
                    console.log(err_notification);
                    //return res.status(status_codes.ERROR).send(err_notification);
                });
        
                let item_id_reference = 0;
                for (let i = 0; i < length; i++) {
                    item.create({
                        exercise_id: exercise_id_reference,
                    })
                    .then((result_item) => {
                        // console.log(result_item);
                        item_id_reference = result_item.dataValues.item_id;
                        ChangeLetter.create({
                            item_id: item_id_reference,
                            hint: AllHints[i],
                            answer: AllAnswers[i],
                        })
                        .then((result_changeLetter) => {
                            // console.log(result_changeLetter);
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
                        // return res.status(status_codes.ERROR).send(err_item);
                    });
                }
                // return res.status(status_codes.SUCCESS).send(result_exercise);
            })
            .catch((err_exercise) => {
                console.log(err_exercise);
                // return res.status(status_codes.ERROR).send(err_exercise);
            });
        }
        else if(type === "categorizewords"){
            let hints = req.body[e].Category;
            let answers = req.body[e].CatWords;
            let AllHints = hints.split("#");
            let AllAnswers = answers.split("###");
            let length = AllHints.length - 1;
            let content = "A categorize words exercise is uploaded";
            let exercise_id_reference = 0;
            exercise.create({
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
                    // console.log(result_notification)
                }).catch((err_notification) => {
                     console.log(err_notification);
                    //return res.status(status_codes.ERROR).send(err_notification);
                });
                let item_id_reference = 0;
                for (let i = 0; i < length; i++) {
                    item.create({
                        exercise_id: exercise_id_reference,
                    })
                    .then((result_item) => {
                        // console.log(result_item);
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
                                    // console.log("words_item created", words_item);
                                })
                                .catch((err_words) => {
                                    // console.log("error in word item");
                                    console.log(err_words);
                                    // return res.status(status_codes.ERROR).send(err_words);
                                });
                            }
                            // console.log(result_groupWords);
                          //return res.status(status_codes.SUCCESS).send(result_shuffle);
                        })
                        .catch((err_groupWords) => {
                            console.log(err_groupWords);
                            // return res.status(status_codes.ERROR).send(err_groupWords);
                        });
                        //return res.status(status_codes.SUCCESS).send(result_item);
                    })
                    .catch((err_item) => {
                        console.log(err_item);
                        // return res.status(status_codes.ERROR).send(err_item);
                    });
                }
                // return res.status(status_codes.SUCCESS).send(result_exercise);
            })
            .catch((err_exercise) => {
                console.log(err_exercise);
                // return res.status(status_codes.ERROR).send(err_exercise);
            });
        }
        else if (type === "readcomplete"){
            let nrows = req.body[e].nrows;
            let ncols = req.body[e].ncols;
            // let description = req.body[e].Description;
            // let moderator_id = req.body[e].moderator_id;
            // let tutorial_id = req.body[e].tutorial_id;
            // let level = req.body[e].level;
            let sentence_list = req.body[e].sentence_list;
            let table = req.body[e].table;
            let exercise_id_reference = 0;
            let content = "A Table completion exercise is uploaded";

            exercise.create({
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
                    // console.log(result_notification)
                }).catch((err_notification) => {
                    console.log(err_notification);
                //return res.status(status_codes.ERROR).send(err_notification);
                });
                let item_id_reference = 0;
                item.create({
                    exercise_id: exercise_id_reference,
                })
                .then((result_item) => {
                    item_id_reference = result_item.dataValues.item_id;
                    ReadComplete.create({
                        item_id: item_id_reference,
                        nrows: nrows,
                        ncols: ncols,
                        sentence_list: sentence_list,
                        table: table,
                    })
                    .then((result_readcomplete) => {
                        // return res.status(status_codes.SUCCESS).send(result_readcomplete);
                    })
                    .catch((err_readcomplete) => {
                        console.log(err_readcomplete);
                        // return res.status(status_codes.ERROR).send(err_readcomplete);
                    });
                })
                .catch((err_item) => {
                    console.log(err_item);
                    // return res.status(status_codes.ERROR).send(err_item);
                });
            })
            .catch((err_exercise) => {
                console.log(err_exercise);
                // return res.status(status_codes.ERROR).send(err_exercise);
            });
        }
        else if(type === "fillgaps"){
            let passage = req.body[e].Passage;
            let answers = []
            const txt = passage;
            const regExp = /\(([^)]+)\)/g;
            const matches = [...txt.match(regExp)];
            console.log(matches);
            for(let i = 0; i < matches.length; i++){
              answers.push(matches[i].replace(/[()]/g, ''));
            }
            let content = "A Fill in the gaps exercise is uploaded";
            let exercise_id_reference = 0;
            exercise.create({
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
                    // console.log(result_notification)
                }).catch((err_notification) => {
                    console.log(err_notification);
                });
                let item_id_reference = 0;
                item.create({
                    exercise_id: exercise_id_reference,
                })
                .then((result_item) => {
                    // console.log(result_item);
                    item_id_reference = result_item.dataValues.item_id;
                    FillInTheGaps.create({
                        item_id: item_id_reference,
                        passage: passage,
                    })
                    .then((result_fillinthegaps) => {
                        // console.log(result_fillinthegaps);
                    for(let i = 0; i < answers.length; i++){
                        Gaps.create({
                            item_id: item_id_reference,
                            gapWord: answers[i],
                        })
                        .then((result_gaps) => {
                            // console.log(result_gaps);
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
                // return res.status(status_codes.SUCCESS).send(result_exercise);
            })
            .catch((err_exercise) => {
                console.log(err_exercise);
                // return res.status(status_codes.ERROR).send(err_exercise);
            });
        }

        
        // else if(type == "readcomplete")
        // {

        //     let nrows = req.body[e].nrows;
        //     let ncols = req.body[e].ncols;
        //     const Grid = req.body[e].Grid;
        //     //convert Grid to Json
        //     //Grid = JSON.parse(Grid);
        //     let Sentences = req.body[e].Sentences;
        //     //split Sentences by #
        //     Sentences = Sentences.split("#");
        //     //convert string array to json array
        //     temp = [];
        //     for(let i=0;i<Sentences.length;i++){
        //         temp.push({"service": Sentences[i]});
        //     }

        //     //convert temp to Json
        //     const sentence_list = temp;

        //     sentence_list = JSON.stringify(sentence_list);
        //     Grid = JSON.stringify(Grid);

        //     //Convert Grid to Json
        //     //Grid = JSON.parse(Grid);

        //     //write that to log file named Grid.txt
        //     fs.writeFile('Grid.txt', Grid, function (err) {
        //         if (err) throw err;
        //         console.log('Saved!');
        //     }
        //     );

        //     //write that to log file named Sentences.txt
        //     fs.writeFile('Sentences.txt', sentence_list, function (err) {
        //         if (err) throw err;
        //         console.log('Saved!');
        //     }
        //     );


        //     console.log("Sentences: "+sentence_list);
        //     console.log("Grid: "+Grid);

            

        //     let content = "A Table completion exercise is uploaded";

        //     exercise.create({
        //         exercise_type: type,
        //         level: level,
        //         approval_status: "pending",
        //         description: description,
        //         moderator_id: moderator_id,
        //         tutorial_id: tutorial_id,
        //         moderated_by: selected_moderator_for_review,
        //     })
        //     .then((result_exercise) => {
        //         exercise_id_reference = result_exercise.dataValues.exercise_id;
        //         ModeratorNotification.create({
        //             content: content+"#"+exercise_id_reference+"#"+moderator_id,
        //             status: "pending",
        //         }).then((result_notification) => {
        //             // console.log(result_notification)
        //         }).catch((err_notification) => {
        //             console.log(err_notification);
        //         });
        //         let item_id_reference = 0;
        //         item.create({
        //             exercise_id: exercise_id_reference,
        //         })
        //         .then((result_item) => {
        //             item_id_reference = result_item.dataValues.item_id;
        //             ReadComplete.create({
        //                 item_id: item_id_reference,
        //                 nrows: nrows,
        //                 ncols: ncols,
        //                 sentence_list: sentence_list,
        //                 table: Grid,
        //             })
        //             .then((result_readcomplete) => {
        //                 // return res.status(status_codes.SUCCESS).send(result_readcomplete);
        //             }).catch((err_readcomplete) => {
        //                 console.log(err_readcomplete);
        //                 console.log(sentence_list);
        //                 console.log(Grid);
        //                 // return res.status(status_codes.ERROR).send(err_readcomplete);
        //             }
        //             );
        //         })
        //         .catch((err_item) => {
        //             console.log(err_item);
        //             // return res.status(status_codes.ERROR).send(err_item);
        //         }
        //         );

        //     })
        //     .catch((err_exercise) => {
        //         console.log(err_exercise);
        //         // return res.status(status_codes.ERROR).send(err_exercise);
        //     }
        //     );
        // }

        else
        {
            console.log("empty line");
            break;
        }
    }



    return res.status(status_codes.SUCCESS).send("Done");        
};

module.exports = insertFromFile;
