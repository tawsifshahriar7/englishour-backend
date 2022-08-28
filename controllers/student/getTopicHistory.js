const { json } = require("express/lib/response");
const Profile = require("../../model/profile");
const status_codes = require("../../utils/status_code/status_code");
const TopicHistory = require("../../model/topic_history");
const Topic = require("../../model/topic");

const getTopicHistory = async (req, res) => {
  let profile_id = parseInt(req.profile.profile_id);
  const topics = await TopicHistory.findAll({
    where: {
      profile_id: profile_id,
    },
  });
  let topicList = [];
  for (let i = 0; i < topics.length; i++) {
    const topic = await Topic.findOne({
      where: {
        topic_id: topics[i].dataValues.topic_id,
      },
    });
    topicList.push(topic.dataValues.topic_name);
  }
  console.log(topicList);
  return res.status(status_codes.SUCCESS).json(topicList);
};

module.exports = getTopicHistory;
