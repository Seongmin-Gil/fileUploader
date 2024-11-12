const express = require("express");
const router = express.Router();
const { getTest, getData } = require("./controller");

router.route("/test").get(getTest);
router.route("/data").get(getData);

module.exports = router;
