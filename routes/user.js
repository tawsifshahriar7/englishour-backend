const express = require("express");
const router = express.Router();
const userInfo = require("../queries/user");
const userRegister = require("../queries/userRegister");
const userLogin = require("../queries/userLogin");

router.get("/user", (req, res) => {
  userInfo(req, res);
});
router.post("/user/register", (req, res) => {
  userRegister(req, res);
});
router.post("/user/login", (req, res) => {
  userLogin(req, res);
});
module.exports = router;
