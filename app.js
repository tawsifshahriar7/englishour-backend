const express = require("express");
require("dotenv").config();
const cors = require("cors");
const moderatorRouters = require("./routes/moderator");
const userRouters = require("./routes/user");

const app = express();
app.use(cors());
app.use(express.json());
app.use(moderatorRouters);
app.use(userRouters);

app.use((err, req, res, next) => {
  res.locals.error = err;
  if (err.status >= 100 && err.status < 600) res.status(err.status);
  else res.status(500);
  res.render("error");
});

module.exports = app;
