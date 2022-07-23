const jwt = require("jsonwebtoken");

const config = process.env;

const verifyProfileToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["profile-access-token"];

  if (!token) {
    return res.status(403).send("No Profile selected");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.profile = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyProfileToken;
