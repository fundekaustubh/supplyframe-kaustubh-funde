const express = require("express");
const router = express.Router();
const weatherAPIControllers = require("../controllers/weatherAPI.js");
const redisControllers = require("../controllers/cache.js");

router.route("/")
	.get(weatherAPIControllers.getPresentWeatherForCoordinates)
	.post(redisControllers.getPresentWeatherForCityInCache, weatherAPIControllers.getPresentWeatherForCity);

module.exports = router;