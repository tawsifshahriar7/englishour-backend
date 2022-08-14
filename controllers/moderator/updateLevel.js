const { json } = require("express/lib/response");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Exercise = require("../../model/exercise");
const ModeratorNotification = require("../../model/moderator_notification");	
const ModeratorNotificationStatus = require("../../model/moderator_notification_status");	

const status_codes = require("../../utils/status_code/status_code");

const UpdateLevel = async (req, res) => {
    console.log(req.body);
    let exercise_id = parseInt(req.body.exercise_id);
    let new_level = parseInt(req.body.new_level);

    //get prev level of exercise
    let exercise = await Exercise.findOne({
        where: {
            exercise_id: exercise_id,
        },
    });

    let prev_level = exercise.dataValues.level;
    let moderator_id = exercise.dataValues.moderator_id;


    await Exercise.update(
        {
            level: new_level,
            approval_status: "pending",
        },
        {
            where: {
                exercise_id: exercise_id,
            },
        }
    )
        
    .then((result) => {
        console.log("success");
        console.log(result);

        //create a notification for the moderator in moderator_notification table
        ModeratorNotification.create({
            content: "Exercise level has been updated to " + new_level+ " from " + prev_level+"#"+exercise_id+"#"+moderator_id,
            date: new Date(),
            status: "pending",
        })
        .then((result) => {
            console.log("success! notification created");
            console.log(result);
        })
        .catch((err) => {
            console.log("notification generation error");
            console.log(err);
        }
        );


        return res.status(status_codes.SUCCESS).send(result);
    }).catch((err) => {
        console.log("failure");
        console.log(err);
        return res.status(status_codes.ERROR).send(err);
    }
    );
}

  
  module.exports = UpdateLevel;