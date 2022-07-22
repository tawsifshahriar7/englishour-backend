const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");


const insert = require("../controllers/insert");
const insertProfile = require("../controllers/insertProfile");
const profileInfo = require("../controllers/profileInfo");
const exerciseInfo = require("../controllers/exerciseInfo");
const moderatorLogin = require("../controllers/moderatorLogin");
const CategoryDetails = require("../controllers/getCategory");
const TopicDetails = require("../controllers/getTopic");
const TutorialDetails = require("../controllers/getTutorial");
const AddTutorial = require("../controllers/addTutorial");

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
