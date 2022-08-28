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
const fillinthegaps = require("../controllers/student/fillinthegaps");
const sentenceshuffle = require("../controllers/student/sentenceshuffle");
const submitExercise = require("../controllers/student/submitExercise");
const getProfiles = require("../controllers/student/getProfiles");
const selectProfile = require("../controllers/student/selectProfile");
const getTutorial = require("../controllers/student/getTutorial");
const updateProfile = require("../controllers/student/profileUpdate");
const groupwords = require("../controllers/student/groupwords");
const readcomplete = require("../controllers/student/readcomplete");
const changePassword = require("../controllers/student/passwordChange");
const viewSecretQuestion = require("../controllers/student/viewSecretQuestion");
const getExerciseList = require("../controllers/student/getExerciseList");
const dictionarySearch = require("../controllers/student/dictionarySearch");
const getCategories = require("../controllers/student/fetchCategories");
const getTopics = require("../controllers/student/getTopics");
const getTestQuestions = require("../controllers/student/test");
const TestSubmission = require("../controllers/student/testSubmission");
const getEntryTest = require("../controllers/student/entryTestFetch");
const EntryTestSubmission = require("../controllers/student/entryTestSubmit");
const setSuggestedLevel = require("../controllers/student/setSuggestedLevel");
const getStats = require("../controllers/student/getStats");
const setAcheivement = require("../controllers/student/setTopicHistory");

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
router.get("/user/fillinthegaps", auth, profileAuth, (req, res) => {
  fillinthegaps(req, res);
});
router.get("/user/sentenceshuffle", auth, profileAuth, (req, res) => {
  sentenceshuffle(req, res);
});
router.get("/user/groupwords", auth, profileAuth, (req, res) => {
  groupwords(req, res);
});
router.get("/user/readcomplete", auth, profileAuth, (req, res) => {
  readcomplete(req, res);
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
router.get("/user/getSecretQuestion", (req, res) => {
  viewSecretQuestion(req, res);
});
router.post("/user/changepassword", (req, res) => {
  changePassword(req, res);
});
router.get("/user/getExerciseList", auth, profileAuth, (req, res) => {
  getExerciseList(req, res);
});
router.get("/user/search", auth, profileAuth, (req, res) => {
  dictionarySearch(req, res);
});
router.get("/user/getCategories", (req, res) => {
  getCategories(req, res);
});
router.get("/user/getTopics", (req, res) => {
  getTopics(req, res);
});
router.get("/user/getTestQuestions", auth, profileAuth, (req, res) => {
  getTestQuestions(req, res);
});
router.post("/user/testSubmission", auth, profileAuth, (req, res) => {
  TestSubmission(req, res);
});
router.get("/user/getEntryTest", (req, res) => {
  getEntryTest(req, res);
});
router.post("/user/entryTestSubmission", auth, profileAuth, (req, res) => {
  EntryTestSubmission(req, res);
});
router.post("/user/setSuggestedLevel", auth, profileAuth, (req, res) => {
  setSuggestedLevel(req, res);
});
router.get("/user/getStats", auth, profileAuth, (req, res) => {
  getStats(req, res);
});
router.get("/user/setAchievement", auth, profileAuth, (req, res) => {
  setAcheivement(req, res);
});
module.exports = router;
