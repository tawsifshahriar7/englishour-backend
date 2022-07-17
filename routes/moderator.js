const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const insert = require("../queries/insert");
const insertProfile = require("../queries/insertProfile");
const profileInfo = require("../queries/profileInfo");
const exerciseInfo = require("../queries/exerciseInfo");
const moderatorLogin = require("../queries/moderatorLogin");

router.post("/moderator/insert", auth, insert);
router.post("/moderator/insertProfile", auth, insertProfile);
router.get("/moderator/profileInfo/moderator_id", auth, profileInfo);
router.get("/moderator/exerciseInfo/moderator_id", auth, exerciseInfo);
router.post("/moderator/login", moderatorLogin);

module.exports = router;