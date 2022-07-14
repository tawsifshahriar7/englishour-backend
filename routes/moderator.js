const express = require("express");
const router = express.Router();
const insert = require("../queries/insert");
const insertProfile = require("../queries/insertProfile");

router.post("/moderator/insert", insert);
router.post("/moderator/insertProfile", insertProfile);

module.exports = router;