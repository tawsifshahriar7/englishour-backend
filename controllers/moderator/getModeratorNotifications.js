const { json } = require("express/lib/response");
const ModeratorNotification = require("../../model/moderator_notification");
const ModeratorNotificationStatus = require("../../model/moderator_notification_status");
const status_codes = require("../../utils/status_code/status_code");

const NotificationInfo = async (req, res) => {
    let moderator_id = parseInt(req.query.moderator_id);
    console.log("ashchi backend: " + moderator_id);
    let SpecificModeratorNotifications = await ModeratorNotificationStatus.findAll({
      where: { moderator_id: moderator_id},
    });
    // console.log("Specific: ",SpecificModeratorNotifications);
    let NotificationDetails = [];
    for(let notification of SpecificModeratorNotifications){
        let notification_id = notification.dataValues.notification_id;
        let notification_details = await ModeratorNotification.findOne({
            where: { notification_id: notification_id, status: "pending" },
        });
        NotificationDetails.push(notification_details.dataValues);
    }
    console.log("NotificationDetails: ",NotificationDetails);
    return res.status(status_codes.SUCCESS).send(NotificationDetails);
};
module.exports = NotificationInfo;

