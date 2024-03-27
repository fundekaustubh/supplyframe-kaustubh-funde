const express = require("express");
const router = express.Router();
const controllers = require("../controllers/weather.js");

router.route("/city/:id")
	.get(controllers.getWeatherForCity);

module.exports = router;