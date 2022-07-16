const { json } = require("express/lib/response");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Moderator = require("../model/moderator");

const login = async (req, res) => {
    try {
        // Get user input
        console.log(req.body);
        const { mobile, password } = req.body;
        // Validate user input
        if (!(mobile && password)) {
            console.log("missing")
            return res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const moderator = await Moderator.findOne({ where: { mobile: mobile } });
        if (moderator && (await bcrypt.compare(password, moderator.password))) {
          // Create token
          const token = jwt.sign(
            { moderator_id: moderator.moderator_id },
            process.env.TOKEN_KEY,
            {
              expiresIn: "1h",
            }
          );
          // save user token
          console.log(token)
          moderator.token = token;
          // user
          return res.status(200).json(token);
        }
        return res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
};
module.exports = login;
