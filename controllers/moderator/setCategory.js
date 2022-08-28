const { json } = require("express/lib/response");
const status_codes = require("../../utils/status_code/status_code");
const Tutorial = require("../../model/tutorial");
const Category = require("../../model/category");
const Topic = require("../../model/topic");
const Moderator = require("../../model/moderator");
// const { now } = require("sequelize/types/utils");

const SetCategory = async (req, res) => {
    // console.log(req.body);
    // let tutorial_title = req.body.tutorial_title;
    // let topic_id = parseInt(req.body.topic_id);
    // let moderator_id = parseInt(req.body.moderator_id);
    // let content = req.body.content;

    let newCategory = req.body.newCategory;

    console.log("newCategory: ", newCategory);

    //create tutorial
    // let category = await Category.create({
    //     category_name: newCategory,
    //     createdAt: now(),
    //     updatedAt: now()
      
    // });


    await Category.findAll({
        where: {  },
      })
      .then((categories) => {

            for(let category of categories)
            {
                if(category.dataValues.category_name === newCategory.category_name)
                {
                    return res.status(status_codes.ERROR).send(categories);

                }
            }
      })

      .catch((err_exercise) => {
        console.log(err_exercise);
        return res.status(status_codes.ERROR).send(err_exercise);
      });

    Category.create({
        // category_id: 3,
        category_name: newCategory.category_name,
        // createdAt: now(),
        // updatedAt: now()
      
    })
    .then((category) => {
        console.log(category);
        return res.status(status_codes.SUCCESS).send(category);
    })
    .catch((err_exercise) => {
        console.log(err_exercise);
        return res.status(status_codes.ERROR).send(err_exercise);
      });

    // console.log("before commiting to db")

    // //commit to database
    // // await category.save();
    // console.log("category created");
    // console.log(category.dataValues.category);
    // return res.status(status_codes.SUCCESS).send(category);
};

module.exports = SetCategory;
