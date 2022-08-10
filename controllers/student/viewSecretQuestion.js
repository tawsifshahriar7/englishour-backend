const { json } = require("express/lib/response");
const SecretQuestion = require("../../model/secretQuestions");
const status_codes = require("../../utils/status_code/status_code");

const viewSecretQuestion = async (req, res) => {
  let user_id = req.query.username;
  let user = await User.findOne({
    where: { username: user_id },
  });
  //console.log(User.designation);
  let profileDetails = [];
  return res.status(status_codes.SUCCESS).send(user);
};

module.exports = viewSecretQuestion;
