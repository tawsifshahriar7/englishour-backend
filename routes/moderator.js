const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const insert = require("../queries/insert");
const insertProfile = require("../queries/insertProfile");
const profileInfo = require("../queries/profileInfo");
const exerciseInfo = require("../queries/exerciseInfo");
const moderatorLogin = require("../queries/moderatorLogin");
const CategoryDetails = require("../queries/getCategory");
const TopicDetails = require("../queries/getTopic");
const TutorialDetails = require("../queries/getTutorial");
const AddTutorial = require("../queries/addTutorial");

router.post("/moderator/insert", auth, insert);
router.post("/moderator/insertProfile", auth, insertProfile);
router.get("/moderator/profileInfo/moderator_id", auth, profileInfo);
router.get("/moderator/exerciseInfo/moderator_id", auth, exerciseInfo);
router.post("/moderator/login", moderatorLogin);
router.get("/moderator/categoryDetails", auth, CategoryDetails);
router.get("/moderator/topicDetails", auth, TopicDetails);
router.get("/moderator/tutorialDetails", auth, TutorialDetails);
router.post("/moderator/addTutorial", auth, AddTutorial);

module.exports = router;