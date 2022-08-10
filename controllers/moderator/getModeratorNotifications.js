const { json } = require("express/lib/response");
const ModeratorNotification = require("../../model/moderator_notification");
const ModeratorNotificationStatus = require("../../model/moderator_notification_status");
const status_codes = require("../../utils/status_code/status_code");

const NotificationInfo = async (req, res) => {
    let NotificationDetails = [];
    let notification_details = await ModeratorNotification.findAll({
        where: {status: "pending" },
    });
    for (let notification of notification_details) {
        if(notification.dataValues.content.split("#")[2] !== req.query.moderator_id){
            NotificationDetails.push(notification.dataValues);
        }
    }
    console.log("NotificationDetails: ",NotificationDetails);
    return res.status(status_codes.SUCCESS).send(NotificationDetails);
};
module.exports = NotificationInfo;

