const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  
  console.log(token);
  console.log("here");

  if (!token) {
    console.log("token verified 1");
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
    console.log("token verified 2");
  } catch (err) {
    console.log("token verified failed");
    return res.status(401).send("Invalid Token");
  }
  console.log("token verified");
  return next();
};

module.exports = verifyToken;
