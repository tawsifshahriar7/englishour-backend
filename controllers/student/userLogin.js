const { json } = require("express/lib/response");
const status_codes = require("../../utils/status_code/status_code");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../model/user");

const login = async (req, res) => {
  try {
    // Get user input
    const { username, password } = req.body;
    // Validate user input
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ where: { username: username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { username: user.username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );
      return res.status(status_codes.SUCCESS).send(token);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};
module.exports = login;
