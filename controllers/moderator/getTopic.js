const { json } = require("express/lib/response");
const Topic = require("../../model/topic");
const Category = require("../../model/category");
const status_codes = require("../../utils/status_code/status_code");

const topicDetails = async (req, res) => {
  console.log(req.query);

  let category_name = req.query.category_name;

  if(category_name === "all")
  {

    let categories = await Category.findAll({
      where: {  },
    });

    let sendAll = [];

    for(let category of categories)
    {
      let topicDetails = [];

      let topics = await Topic.findAll({
        where: { category_id: category.dataValues.category_id },
      });
      for (let topic of topics) {
        topicDetails.push(topic.dataValues.topic_name);
      }
      sendAll.push({"category_name": category.category_name, "topics_list": topicDetails});

    }

    return res.status(status_codes.SUCCESS).send(sendAll);
  }


  let category = await Category.findOne({
    where: { category_name: req.query.category_name },
  });

  let topicDetails = [];
  let topics = await Topic.findAll({
    where: { category_id: category.dataValues.category_id },
  });
  for (let topic of topics) {
    topicDetails.push(topic.dataValues);
  }
  console.log("topic details: ", topicDetails);
  return res.status(status_codes.SUCCESS).send(topicDetails);
};

module.exports = topicDetails;
