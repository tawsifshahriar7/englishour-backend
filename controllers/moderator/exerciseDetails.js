const { json } = require("express/lib/response");
const Exercise = require("../../model/exercise");
const Tutorial  = require("../../model/tutorial");
const Topic = require("../../model/topic");
const Category = require("../../model/category");
const status_codes = require("../../utils/status_code/status_code");

const exerciseDetails = async (req, res) => {
    console.log("in exercise Details")
    let tutorial_id = parseInt(req.query.tutorial_id);

    //get the topic id from the tutorial id
    let tutorial = await Tutorial.findOne({
        where: {
            tutorial_id: tutorial_id,
        },
    });

    let tutorial_name = tutorial.dataValues.tutorial_title;

    let topic_id = tutorial.dataValues.topic_id;

    //get topic name from topic id
    let topic = await Topic.findOne({
        where: {
            topic_id: topic_id,
        },
    });
    let topic_name = topic.dataValues.topic_name;
    console.log(topic_name);

    //get category id from topic id
    let category_id = topic.dataValues.category_id;
    console.log(category_id);

    //get category name from category id
    let category = await Category.findOne({
        where: {
            category_id: category_id,
        },
    });

    let category_name = category.dataValues.category_name;

    //send the topic name, category name and tutorial id to the frontend
    let response = {
        tutorial_name: tutorial_name,
        topic_name: topic_name,
        category_name: category_name,
    };
    return res.status(status_codes.SUCCESS).send(response);









    //   console.log("backend: " + moderator_id);
    //   let exercises = await Exercise.findAll({
    //     where: { moderator_id: moderator_id },
    //   });
    //   console.log(exercises);
    //   let profileDetails = [];
    //   return res.status(status_codes.SUCCESS).send(exercises);
};

module.exports = exerciseDetails;
