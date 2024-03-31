const redis = require("redis");
let redisClient = undefined;
const cities = require("../data/cities/cities.json");
const citiesData = {};

const getPresentWeatherForCityInCache = async (req, res, next) => {
	if(redisClient === undefined) redisClient = await redis.createClient();
	// const { body } = req;
	// try {
	// 	const selectedCity = body['selected-city'].split(", ")[0];
	// 	if (selectedCity === undefined) throw new Error("Please mention the city name!");
	// 	const requiredCity = cities.filter(city => city.city === selectedCity)[0];
	// 	if (requiredCity === undefined) throw new Error("City not found!");
	// 	const { lat, lng } = requiredCity;

	// 	return res.redirect(`http://localhost:3000?lat=${lat}&lng=${lng}`);
	// }
	// catch (error) {
	// 	return res.render("weather/error", { error: error.message });
	// };
	console.log("redis: ", redisClient);
	await redisClient.set("hi", "hello");
	const value = await redisClient.get("hi");
	console.log(value);
	next();
};

module.exports = { getPresentWeatherForCityInCache };