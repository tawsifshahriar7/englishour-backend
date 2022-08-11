const { json } = require("express/lib/response");
const ModeratorNotification = require("../../model/moderator_notification");
const Exercise = require("../../model/exercise");
const status_codes = require("../../utils/status_code/status_code");

const UpdateStatus = async (req, res) => {
    console.log("approve: ", req.query.notification_id, req.query.status);
    await ModeratorNotification.update(
        {
            status: "reviewed",
        },
        {
            where: {
              notification_id: parseInt(req.query.notification_id),
            },
        }
    );
    let Content = await ModeratorNotification.findOne({
        where: { notification_id: parseInt(req.query.notification_id) },
    })
    let exercise_id = Content.dataValues.content.split("#")[1];
    await Exercise.update(
        {
            approval_status: req.query.status,
        },
        {
            where: {
              exercise_id: parseInt(exercise_id),
            },
        }
    );
    return res.status(status_codes.SUCCESS).send("Status Updated");
};
module.exports = UpdateStatus;

