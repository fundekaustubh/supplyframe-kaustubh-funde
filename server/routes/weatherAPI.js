const express = require("express");
const router = express.Router();
const weatherAPIControllers = require("../controllers/weatherAPI.js");

router.route("/")
	.get(weatherAPIControllers.getPresentWeatherForCoordinates)
	.post(weatherAPIControllers.getPresentWeatherForCity);

module.exports = router;