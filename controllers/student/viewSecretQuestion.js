const { json } = require("express/lib/response");
const SecretQuestion = require("../../model/secretQuestions");
const status_codes = require("../../utils/status_code/status_code");

const viewSecretQuestion = async (req, res) => {
  let user_id = req.query.username;
  SecretQuestion.findOne({ where: { username: user_id } })
    .then((result) => {
      let retval = result.dataValues.secret_question;
      return res.status(status_codes.SUCCESS).send(retval);
    })
    .catch((err) => {
      return res
        .status(status_codes.INTERNAL_SERVER_ERROR)
        .send("User not found");
    });
};

module.exports = viewSecretQuestion;
