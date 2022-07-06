const express = require("express");
require("dotenv").config();
// const User = require("./model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");

const app = express();
app.use(express.json());
//Register
// app.post("/register", async (req, res) => {
//   try {
//     // Get user input
//     console.log(req.body);
//     const { firstName, lastName, email, password } = req.body;

//     // Validate user input
//     if (!(email && password && firstName && lastName)) {
//       res.status(400).send("All input is required");
//     }

//     // check if user already exist
//     // Validate if user exist in our database
//     const oldUser = await User.findOne({ email });

//     if (oldUser) {
//       return res.status(409).send("User Already Exist. Please Login");
//     }

//     //Encrypt user password
//     encryptedUserPassword = await bcrypt.hash(password, 10);

//     // Create user in our database
//     const user = await User.create({
//       first_name: firstName,
//       last_name: lastName,
//       email: email.toLowerCase(), // sanitize
//       password: encryptedUserPassword,
//     });

//     // Create token
//     const token = jwt.sign(
//       { user_id: user._id, email },
//       process.env.TOKEN_KEY,
//       {
//         expiresIn: "5h",
//       }
//     );
//     // save user token
//     user.token = token;

//     // return new user
//     res.status(201).json(user);
//   } catch (err) {
//     console.log(err);
//   }
// });

// //Login
// app.post("/login", async (req, res) => {
//   try {
//     // Get user input
//     const { email, password } = req.body;

//     // Validate user input
//     if (!(email && password)) {
//       res.status(400).send("All input is required");
//     }
//     // Validate if user exist in our database
//     const user = await User.findOne({ email });

//     if (user && (await bcrypt.compare(password, user.password))) {
//       // Create token
//       const token = jwt.sign(
//         { user_id: user._id, email },
//         process.env.TOKEN_KEY,
//         {
//           expiresIn: "5h",
//         }
//       );

//       // save user token
//       user.token = token;

//       // user
//       return res.status(200).json(user);
//     }
//     return res.status(400).send("Invalid Credentials");
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.post("/welcome", auth, (req, res) => {
//   console.log(req.user);
//   res.status(200).send("Welcome to FreeCodeCamp 🙌");
// });

module.exports = app;
