const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const insert = require("../controllers/moderator/insert");
const insertProfile = require("../controllers/moderator/insertProfile");
const profileInfo = require("../controllers/moderator/profileInfo");
const exerciseInfo = require("../controllers/moderator/exerciseInfo");
const moderatorLogin = require("../controllers/moderator/moderatorLogin");
const CategoryDetails = require("../controllers/moderator/getCategory");
const TopicDetails = require("../controllers/moderator/getTopic");
const TutorialDetails = require("../controllers/moderator/getTutorial");
const AddTutorial = require("../controllers/moderator/addTutorial");
const TutorialInfo = require("../controllers/moderator/tutorialInfo");
const UpdatePassword = require("../controllers/moderator/updatePassword");
const ForgotPassword = require("../controllers/moderator/forgotPassword");
const ModeratorNotification = require("../controllers/moderator/getModeratorNotifications");
const ExerciseDetails = require("../controllers/moderator/getExInfo");
const getExercisePreview = require("../controllers/moderator/getExercisePreview");
const UpdateStatus = require("../controllers/moderator/approveExercise");
const ModStats = require("../controllers/moderator/getModStats");
const UpdateLevel = require("../controllers/moderator/updateLevel");
const GraphChart = require("../controllers/moderator/graphChart");
const AllGraphs = require("../controllers/moderator/allGraphs");

const ConsecutiveDetails = require("../controllers/moderator/exerciseDetails");
const TreeView  = require("../controllers/moderator/TreeView");
const TopicStats = require("../controllers/moderator/getTopicStats");
const insertFromFile = require("../controllers/moderator/insertFromFile");

const SetCategory = require("../controllers/moderator/setCategory");



router.post("/moderator/insert", auth, insert);
router.post("/moderator/insertProfile", auth, insertProfile);
router.get("/moderator/profileInfo/moderator_id", auth, profileInfo);
router.get("/moderator/exerciseInfo/moderator_id", auth, exerciseInfo);
router.post("/moderator/login", moderatorLogin);
router.get("/moderator/categoryDetails", auth, CategoryDetails);
router.get("/moderator/topicDetails", auth, TopicDetails);
router.get("/moderator/tutorialDetails", auth, TutorialDetails);
router.post("/moderator/addTutorial", auth, AddTutorial);
router.get("/moderator/tutorialInfo/moderator_id", auth, TutorialInfo);
router.post("/moderator/updatePassword", auth, UpdatePassword);
router.post("/moderator/forgotPassword", ForgotPassword);
router.get("/moderator/notification/moderator_id", auth, ModeratorNotification);
router.get("/moderator/exerciseDetails", auth, ExerciseDetails);
router.get("/moderator/exercisePreview", auth, getExercisePreview);
router.post("/moderator/approveExercise", auth, UpdateStatus);
router.get("/moderator/getModStats", auth, ModStats);
router.post("/moderator/updateLevel", auth, UpdateLevel);
router.get("/moderator/graphChart", auth, GraphChart);
router.get("/moderator/allGraphs", auth, AllGraphs);

router.get("/moderator/getConsecutiveDetails", auth, ConsecutiveDetails);
router.get("/moderator/getTreeView", auth, TreeView);
router.get("/moderator/getTopicStats", auth, TopicStats);
router.post("/moderator/insertFromFile", auth, insertFromFile);


router.post("/moderator/setCategory", auth, SetCategory);


module.exports = router;
