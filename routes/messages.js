var express = require("express");
var router = express.Router();

const { getAll, searchByUserId } = require("../controllers/messages");

router.get("/", getAll);
router.get("/search", searchByUserId);

module.exports = router;
