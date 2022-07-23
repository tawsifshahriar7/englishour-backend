const { json } = require("express/lib/response");
const Moderator = require("../../model/moderator");
const status_codes = require("../../utils/status_code/status_code");

const profileInfo = async (req, res) => {
  let moderator_id = parseInt(req.query.moderator_id);
  let moderator = await Moderator.findOne({
    where: { moderator_id: moderator_id },
  });
  console.log(moderator);
  return res.status(status_codes.SUCCESS).send(moderator);
};

module.exports = profileInfo;
