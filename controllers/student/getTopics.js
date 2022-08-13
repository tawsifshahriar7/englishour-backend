const { json } = require("express/lib/response");
const Topic = require("../../model/topic");
const status_codes = require("../../utils/status_code/status_code");

const getTopics = async (req, res) => {
  const category_id = req.query.category_id;
  Topic.findAll({
    where: {
      category_id: category_id,
    },
  })
    .then((topics) => {
      result = [];
      for (let i = 0; i < topics.length; i++) {
        result.push({
          topic_id: topics[i].dataValues.topic_id,
          topic_name: topics[i].dataValues.topic_name,
        });
      }
      res.status(status_codes.SUCCESS).json(result);
    })
    .catch((err) => {
      res.status(status_codes.INTERNAL_SERVER_ERROR).json(err);
    });
};

module.exports = getTopics;
