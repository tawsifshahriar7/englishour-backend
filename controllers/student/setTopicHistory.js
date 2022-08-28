const { json } = require("express/lib/response");
const status_codes = require("../../utils/status_code/status_code");
const TopicHistory = require("../../model/topic_history");

const setAcheivement = async (req, res) => {
    try {
        const studentId = req.profile.profile_id;
        const topicId = req.body.topicId;
        const topicHistory = await TopicHistory.findOne({
            where: {
                topic_id: topicId,
                profile_id: studentId,
            },
        });
        if (topicHistory) {
        return res
            .status(status_codes.SUCCESS)
            .json({ message: "Topic already exists" });
        }
        await TopicHistory.create({
            topic_id: topicId,
            profile_id: studentId,
            status: 'solved',
        });
        return res.status(status_codes.SUCCESS).json({ message: "Topic added" });
    } catch (error) {
        return res
        .status(status_codes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
};

module.exports = setAcheivement;