const express = require("express");
const router = express.Router();
const insert = require("../queries/insert");
const insertProfile = require("../queries/insertProfile");
const profileInfo = require("../queries/profileInfo");
const exerciseInfo = require("../queries/exerciseInfo");

router.post("/moderator/insert", insert);
router.post("/moderator/insertProfile", insertProfile);
router.get("/moderator/profileInfo/moderator_id", profileInfo);
router.get("/moderator/exerciseInfo/moderator_id", exerciseInfo);

module.exports = router;