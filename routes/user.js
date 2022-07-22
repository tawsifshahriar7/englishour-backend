const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userInfo = require("../controllers/student/user");
const userRegister = require("../controllers/student/userRegister");
const userLogin = require("../controllers/student/userLogin");
const createProfile = require("../controllers/student/createProfile");
const profileInfo = require("../controllers/student/userProfile");
const letterchange = require("../controllers/student/letterchange");
const sentenceshuffle = require("../controllers/student/sentenceshuffle");
const submitExercise = require("../controllers/student/submitExercise");
const getProfiles = require("../controllers/student/getProfiles");

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
router.get("/user/sentenceshuffle", (req, res) => {
  sentenceshuffle(req, res);
});
router.post("/user/submitExercise", (req, res) => {
  submitExercise(req, res);
});
router.get("/user/getProfiles", (req, res) => {
  getProfiles(req, res);
});
module.exports = router;
