const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const profileAuth = require("../middleware/profileAuth");
const userInfo = require("../controllers/student/user");
const userRegister = require("../controllers/student/userRegister");
const userLogin = require("../controllers/student/userLogin");
const createProfile = require("../controllers/student/createProfile");
const profileInfo = require("../controllers/student/userProfile");
const letterchange = require("../controllers/student/letterchange");
const sentenceshuffle = require("../controllers/student/sentenceshuffle");
const submitExercise = require("../controllers/student/submitExercise");
const getProfiles = require("../controllers/student/getProfiles");
const selectProfile = require("../controllers/student/selectProfile");
const getTutorial = require("../controllers/student/getTutorial");
const updateProfile = require("../controllers/student/profileUpdate");

router.get("/user/info", auth, (req, res) => {
  userInfo(req, res);
});
router.post("/user/register", (req, res) => {
  userRegister(req, res);
});
router.post("/user/login", (req, res) => {
  userLogin(req, res);
});
router.post("/user/createprofile", auth, (req, res) => {
  createProfile(req, res);
});
router.get("/user/profile", auth, profileAuth, (req, res) => {
  profileInfo(req, res);
});
router.get("/user/letterchange", auth, profileAuth, (req, res) => {
  letterchange(req, res);
});
router.get("/user/sentenceshuffle", auth, profileAuth, (req, res) => {
  sentenceshuffle(req, res);
});
router.post("/user/submitExercise", auth, profileAuth, (req, res) => {
  submitExercise(req, res);
});
router.get("/user/getProfiles", auth, (req, res) => {
  getProfiles(req, res);
});
router.get("/user/selectProfile", auth, (req, res) => {
  selectProfile(req, res);
});
router.get("/user/getTutorial", auth, profileAuth, (req, res) => {
  getTutorial(req, res);
});
router.post("/user/updateProfile", auth, profileAuth, (req, res) => {
  updateProfile(req, res);
});
module.exports = router;
