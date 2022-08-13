const { json } = require("express/lib/response");
const status_codes = require("../../utils/status_code/status_code");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../model/user");
const SecretQuestion = require("../../model/secretQuestions");

const register = async (req, res) => {
  console.log(req.body.usernames)
  try {
    // Get user input
    const { username, email, password, secret_question, secret_answer } =
      req.body;
    // Validate user input
    if (!(email && password && username)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ where: { username: username } });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedUserPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    // const user = await User.create({
    //   username: username,
    //   email: email.toLowerCase(), // sanitize
    //   password: encryptedUserPassword,
    // });

    await User.create({
      username: username,
      email: email.toLowerCase(), // sanitize
      password: encryptedUserPassword,
    })
      .then((user) => {
        SecretQuestion.create({
          username: username,
          secret_question: secret_question,
          secret_answer: secret_answer,
        })
          .then((response) => {
            console.log(response);
            const token = jwt.sign(
              { username: user.username },
              process.env.TOKEN_KEY,
              {
                expiresIn: "5h",
              }
            );
            // return new user
            user.token = token;
            res.status(201).json(user);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    // Create token
  } catch (err) {
    console.log(err);
  }
};
module.exports = register;
