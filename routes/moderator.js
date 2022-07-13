const express = require("express");
const router = express.Router();
const insert = require("../queries/insert");

router.post("/moderator/insert", insert);

module.exports = router;