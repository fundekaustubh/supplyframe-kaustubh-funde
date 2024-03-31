const express = require("express");
const router = express.Router();
const weatherAPIControllers = require("../controllers/weatherAPI.js");
const cacheControllers = require("../controllers/cache.js");

router.route("/")
	.get(cacheControllers.getPresentWeatherForCoordinatesInCache, weatherAPIControllers.getPresentWeatherForCoordinates)
	.post(weatherAPIControllers.getPresentWeatherForCity);

module.exports = router;