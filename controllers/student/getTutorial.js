const { json } = require("express/lib/response");
const Tutorial = require("../../model/tutorial");
const status_codes = require("../../utils/status_code/status_code");
const fs = require("fs");
const path = require("path");

const TutorialDetails = async (req, res) => {
  let topic_id = req.query.topic_id;
  Tutorial.findOne({
    attributes: ["content"],
    where: { topic_id: topic_id },
  })
    .then((tutorial) => {
      // res.status(status_codes.SUCCESS).json(tutorial);
      console.log(path.join(__dirname, tutorial.content));
      let markdowncontent = fs.readFileSync(
        path.join(__dirname, tutorial.content),
        "utf8"
      );
      res.status(status_codes.SUCCESS).json(markdowncontent);
    })
    .catch((err) => {
      res.status(status_codes.INTERNAL_SERVER_ERROR).json(err);
    });
};

module.exports = TutorialDetails;
