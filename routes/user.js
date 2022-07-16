const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userInfo = require("../queries/user");
const userRegister = require("../queries/userRegister");
const userLogin = require("../queries/userLogin");
const createProfile = require("../queries/createProfile");
const profileInfo = require("../queries/userProfile");
const letterchange = require("../queries/letterchange");

router.get("/user/info", auth, (req, res) => {
  userInfo(req, res);
});
router.post("/user/register", (req, res) => {
  userRegister(req, res);
});
router.post("/user/login", (req, res) => {
  userLogin(req, res);
});
router.post("/user/createprofile", (req, res) => {
  createProfile(req, res);
});
router.get("/user/profile", (req, res) => {
  profileInfo(req, res);
});
router.get("/user/letterchange", (req, res) => {
  letterchange(req, res);
});
module.exports = router;
