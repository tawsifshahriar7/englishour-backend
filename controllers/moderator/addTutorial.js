const { json } = require("express/lib/response");
const status_codes = require("../../utils/status_code/status_code");
const Tutorial = require("../../model/tutorial");
const Topic = require("../../model/topic");
const Moderator = require("../../model/moderator");

const addTutorial = async (req, res) => {
    console.log(req.body);
    let tutorial_title = req.body.tutorial_title;
    let topic_id = parseInt(req.body.topic_id);
    let moderator_id = parseInt(req.body.moderator_id);
    let content = req.body.content;

    //find topic or return error
    let topic = await Topic.findOne({
        where: {
            topic_id: topic_id,
        },
    });

    if (topic === null) {
        console.log("topic not found");
        return res.status(status_codes.NOT_FOUND).send("Topic not found");
    }

    else
    {
        console.log(topic);
    }

    //find moderator or return error
    let moderator = await Moderator.findOne({
        where: {
            moderator_id: moderator_id,
        },
    });

    if (moderator === null) {
        console.log("moderator not found");
        return res.status(status_codes.NOT_FOUND).send("Moderator not found");
    }
    
    //create tutorial
    let tutorial = await Tutorial.create({
        tutorial_title: tutorial_title,
        topic_id: topic_id,
        moderator_id: moderator_id,
        content: content,
    });

    //commit to database
    await tutorial.save();
    console.log("tutorial created");
    console.log(tutorial.dataValues.tutorial_id);
    return res.status(status_codes.SUCCESS).send(tutorial);
};

module.exports = addTutorial;
