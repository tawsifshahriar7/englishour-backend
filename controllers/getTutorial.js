const { json } = require("express/lib/response");
const Tutorial = require("../model/tutorial");
const status_codes = require("../utils/status_code/status_code");

const TutorialDetails = async (req, res) => {
  let tutorialDetails = [];
  let tunorials = await Tutorial.findAll({
     where: { topic_name: req.query.topic_name },
  });
  for(let tutorial of tunorials){
    tutorialDetails.push(tutorial.dataValues);
  }
  console.log(tutorialDetails)
  return res.status(status_codes.SUCCESS).send(tutorialDetails);
};

module.exports = TutorialDetails;
