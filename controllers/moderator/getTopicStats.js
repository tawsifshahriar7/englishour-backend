const { json } = require("express/lib/response");
const Exercise = require("../../model/exercise");
const Item = require("../../model/item");
const History = require("../../model/history");
const Topic = require("../../model/topic");
const Category = require("../../model/category");
const Tutorial = require("../../model/tutorial");

const status_codes = require("../../utils/status_code/status_code");


const TopicStats = async (req, res) => {

    
    let topic_stats = [];
    
    //get total number of attempts for exercises under each topic
    let topics = await Topic.findAll({
        attributes: ['topic_id', 'topic_name', 'category_id'],
    });


    for (let topic of topics) {
        let topic_id = topic.dataValues.topic_id;
        let topic_name = topic.dataValues.topic_name;
        let category_id = topic.dataValues.category_id;

        //get Category name from category id
        let category = await Category.findOne({
            where: { category_id: category_id },
        });
        let category_name = category.dataValues.category_name;

        let topic_individual_stats = {
            topic_id: topic_id,
            topic_name: topic_name,
            category_name: category_name,
            no_of_attempts: 0,
            no_of_readComplete: 0,
            no_of_shuffledSentence: 0,
            no_of_letterChange: 0,
            no_of_groupWords: 0,
            no_of_fillInTheGaps: 0,
            no_of_solved: 0,
        };

        let no_of_attempts = 0;
    

        //get all tutorials under each topic
        let tutorials = await Tutorial.findAll({
            where: { topic_id: topic_id },
            attributes: ['tutorial_id', 'tutorial_title', 'topic_id'],
        });

        //get total number of attempts for each tutorial
        let tutorial_stats = [];
        for (let tutorial of tutorials) {
            let tutorial_id = tutorial.dataValues.tutorial_id;
            let tutorial_name = tutorial.dataValues.tutorial_title;
            let topic_id = tutorial.dataValues.topic_id;
            let category_id = tutorial.dataValues.category_id;
            let exercise_stats = [];
            //get all exercises under each tutorial
            let exercises = await Exercise.findAll({
                where: { tutorial_id: tutorial_id },
                attributes: ['exercise_id', 'exercise_type', "level"],
            });
            
            //get all items under each exercise
            for (let exercise of exercises) {
                let exercise_id = exercise.dataValues.exercise_id;
                let exercise_type = exercise.dataValues.exercise_type;
                let tutorial_id = exercise.dataValues.tutorial_id;
                let level = exercise.dataValues.level;
                let item_stats = [];
                let items = await Item.findAll({
                    where: { exercise_id: exercise_id },
                    attributes: ['item_id'],
                });

                if(exercise.dataValues.exercise_type == "readcomplete"){
                    topic_individual_stats.no_of_readComplete++;
                }
                else if(exercise.dataValues.exercise_type == "sentenceshuffling"){
                    topic_individual_stats.no_of_shuffledSentence++;
                }
                else if(exercise.dataValues.exercise_type == "changeletter"){
                    topic_individual_stats.no_of_letterChange++;
                }
                else if(exercise.dataValues.exercise_type == "categorizewords"){
                    topic_individual_stats.no_of_groupWords++;
                }
                else if(exercise.dataValues.exercise_type == "fillgaps"){
                    topic_individual_stats.no_of_fillInTheGaps++;
                }
                
                for (let item of items) {
                    let item_id = item.dataValues.item_id;
                    let item_attempts = await History.findAll({
                        where: { item_id: item_id },
                        attributes: ['item_id', 'nattempts', 'status'],	
                    });

    

                    for (let item_attempt of item_attempts) {
                        console.log("item_id", item_id);
                        console.log("item_attempt", item_attempt.dataValues.nattempts);
                        no_of_attempts += item_attempt.dataValues.nattempts;
                        if(item_attempt.dataValues.status == "solved")
                        {
                            topic_individual_stats.no_of_solved++;
                        }
                    }
                }
            }
        }
        topic_individual_stats.no_of_attempts = no_of_attempts;

        topic_stats.push(topic_individual_stats);
    }

    console.log(topic_stats);


    return res.status(status_codes.SUCCESS).send(topic_stats);


};

module.exports = TopicStats;
