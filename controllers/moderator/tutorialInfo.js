const { json } = require("express/lib/response");
const Exercise = require("../../model/exercise");
const Tutorial = require("../../model/tutorial");
const status_codes = require("../../utils/status_code/status_code");

const tutorialInfo = async (req, res) => {
  let moderator_id = parseInt(req.query.moderator_id);
  console.log("backend: " + moderator_id);
  let tutorials = await Tutorial.findAll({
    where: { moderator_id: moderator_id },
  });
  console.log(tutorials);
  return res.status(status_codes.SUCCESS).send(tutorials);
};

module.exports = tutorialInfo;
