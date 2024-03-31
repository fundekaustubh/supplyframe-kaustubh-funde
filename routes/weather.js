const express = require("express");
const router = express.Router();
const weatherControllers = require("../controllers/weather.js");
const middleware = require("../middleware");
router.route("/")
	.get(middleware.insertLocation, weatherControllers.getHomePage);

module.exports = router;