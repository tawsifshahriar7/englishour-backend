const { json } = require("express/lib/response");
const ModeratorNotification = require("../../model/moderator_notification");
const Exercise = require("../../model/exercise");
const status_codes = require("../../utils/status_code/status_code");

const NotificationInfo = async (req, res) => {
    let NotificationDetails = [];
    let notification_details = await ModeratorNotification.findAll({
        where: {status: "pending" },
    });
    console.log("Details: ",notification_details, req.query.moderator_id);
    // for (let notification of notification_details) {
    //     if(notification.dataValues.content.split("#")[2] !== req.query.moderator_id){
    //         NotificationDetails.push(notification.dataValues);
    //     }
    // }
    for(let notification of notification_details){
        let respective_exercise_id = notification.dataValues.content.split("#")[1];
        console.log("respective_exercise_id: ",respective_exercise_id);
        let exercise = await Exercise.findOne({
            where: {
                exercise_id: respective_exercise_id,
            },
        });
        console.log("exercise in notification: ", exercise);
        let respective_moderatee_id = exercise.dataValues.moderated_by;
        console.log("respective_moderatee_id: ", respective_moderatee_id , req.query.moderator_id);
        if(parseInt(respective_moderatee_id) === parseInt(req.query.moderator_id)){
            console.log("inside if", notification.dataValues);
            NotificationDetails.push(notification.dataValues);
        }
    }
    console.log("NotificationDetails: ",NotificationDetails);
    return res.status(status_codes.SUCCESS).send(NotificationDetails);
};
module.exports = NotificationInfo;

