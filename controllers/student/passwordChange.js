const { json } = require("express/lib/response");
const status_codes = require("../../utils/status_code/status_code");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../model/user");
const SecretQuestion = require("../../model/secretQuestions");

const changePassword = async (req, res) => {
  try {
    // Get user input
    const { username, secret_answer, password } = req.body;
    // Validate if user exist in our database
    const user = await User.findOne({ where: { username: username } });
    if (user) {
      const secret = await SecretQuestion.findOne({
        where: { username: username },
      });
      if (secret.dataValues.secret_answer === secret_answer) {
        const encryptedUserPassword = await bcrypt.hash(password, 10);
        const user = await User.update(
          { password: encryptedUserPassword },
          { where: { username: username } }
        );
        return res.status(status_codes.SUCCESS).send("Password Changed");
      }
      return res.status(status_codes.FORBIDDEN).send("Invalid Secret Answer");
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = changePassword;
