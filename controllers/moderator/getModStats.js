const { json } = require("express/lib/response");
const Exercise = require("../../model/exercise");
const Item = require("../../model/item");
const History = require("../../model/history");
const Topic = require("../../model/topic");
const Category = require("../../model/category");
const Tutorial = require("../../model/tutorial");

const status_codes = require("../../utils/status_code/status_code");


const ModStats = async (req, res) => {

    console.log(req.query);
    let moderator_id = parseInt(req.query.moderator_id);
    console.log("backend: " + moderator_id);
    let exercises = await Exercise.findAll({
        // where: { moderator_id: moderator_id , approval_status: "approved" },
        where: { moderator_id: moderator_id },
    });

    if(exercises.length == 0){
        return res.status(status_codes.SUCCESS).send("No exercises found");
    }

    let allExerciseDetails = [];
    for (let exercise of exercises) {
        let exercise_id = exercise.dataValues.exercise_id;
        let level = exercise.dataValues.level;
        //filter only the date from the creation date
        let creation_date = exercise.dataValues.createdAt.toString();
        console.log(creation_date);

        //get items with exercise_id
        let items = await Item.findAll({
            where: { exercise_id: exercise_id },
        });


        //get tutorial from tutorial id
        let tutorial_id = exercise.dataValues.tutorial_id;
        let tutorial = await Tutorial.findOne({
            where: { tutorial_id: tutorial_id },
        });

        //get topic_id from tutorial
        let topic_id = tutorial.dataValues.topic_id;
        console.log("topic_id:"+topic_id);

        //get topic details from topic id
        let topic = await Topic.findOne({
            where: { topic_id: topic_id },
        });

        let topic_name = topic.dataValues.topic_name;
        console.log("topic_name:"+topic_name);

        //fet category details from category id
        let category = await Category.findOne({
            where: { category_id: topic.dataValues.category_id },
        });

        let category_name = category.dataValues.category_name;






        //make a json object for each exercise
        let exerciseDetails = {
            exercise_id: exercise_id,
            exercise_type: exercise.dataValues.exercise_type,
            creation_date: creation_date,
            level: level,
            topic_name: topic_name,
            category_name: category_name,
            no_of_items: items.length,
            no_of_attempts: 0,
            no_of_solves: 0,

        };

        for (let item of items) {
            let item_id = item.dataValues.item_id;
            let history = await History.findAll({
                where: { item_id: item_id },
            });

            console.log(history);

            for(let h of history){
                if(h.dataValues.status == 'solved'){	
                    exerciseDetails.no_of_solves++;
                }
                exerciseDetails.no_of_attempts += h.dataValues.nattempts;
            }

            console.log(exerciseDetails);

            


            // exerciseDetails.no_of_attempts += history.dataValues.nattempts;
            
            // if (history.dataValues.status == 'solved') {
            //     no_of_solves++;
            // }
        }
        
        // if(exerciseDetails.no_of_attempts != 0)
        // {
        //     allExerciseDetails.push(exerciseDetails);
        // }
        allExerciseDetails.push(exerciseDetails);
    }

    // make a json with exercise_id, no_of_attempts, solve_status
    console.log(allExerciseDetails);
    return res.status(status_codes.SUCCESS).send(allExerciseDetails);
};

module.exports = ModStats;
