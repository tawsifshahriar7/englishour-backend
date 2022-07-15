const express = require("express");
const router = express.Router();
const insert = require("../queries/insert");
const insertProfile = require("../queries/insertProfile");
const profileInfo = require("../queries/profileInfo");

router.post("/moderator/insert", insert);
router.post("/moderator/insertProfile", insertProfile);
router.get("/moderator/profileInfo/moderator_id", profileInfo);

module.exports = router;