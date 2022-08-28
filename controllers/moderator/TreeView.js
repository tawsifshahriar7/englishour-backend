const { json } = require("express/lib/response");
const Exercise = require("../../model/exercise");
const Tutorial  = require("../../model/tutorial");
const Topic = require("../../model/topic");
const Category = require("../../model/category");
const status_codes = require("../../utils/status_code/status_code");

const TreeView = async (req, res) => {
    console.log("in Tree View!")

    //get all categories
    let categories = await Category.findAll({
        attributes: ['category_id', 'category_name'],
    });

    //get all topics
    let topics = await Topic.findAll({
        attributes: ['topic_id', 'topic_name', 'category_id'],	
    });

    //get all tutorials
    let tutorials = await Tutorial.findAll({
        attributes: ['tutorial_id', 'tutorial_title', 'topic_id'],
    });

    //get all exercises that are approved
    let exercises = await Exercise.findAll({
        where: {
            //for testing purposes,  get exercises that are pending
            approval_status: "approved",	
            //approval_status: "approved",
        },
        attributes: ['exercise_id', 'exercise_type', 'tutorial_id', "level"],
    });

    //response to the frontend
    let response = {
        categories: categories,
        topics: topics,
        tutorials: tutorials,
        exercises: exercises,
    };

    return res.status(status_codes.SUCCESS).send(response);
};

module.exports = TreeView;
