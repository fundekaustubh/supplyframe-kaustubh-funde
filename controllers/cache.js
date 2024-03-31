const cities = require("../data/cities/cities.json");
const { getPresentWeatherForCoordinates } = require("./weatherAPI");
const cachedCities = {};

const getPresentWeatherForCoordinatesInCache = async (req, res, next) => {
	const { query } = req;
	const { lat = undefined, lng = undefined } = query;
	if (lat === undefined || lng === undefined) return res.redirect(process.env.HOST_URL);
	try {
		const selectedCity = cities.filter(city => city.lat === lat && city.lng === lng)[0];
		if (selectedCity === undefined) throw new Error("Invalid coordinates!");
		const requiredCity = cities.filter(city => city.city === selectedCity)[0];
		if (requiredCity === undefined) throw new Error("City not found!");
		let presentWeather = undefined;
		if (cachedCities[`${lat},${lng}`] !== undefined) {
			const currentTime = new Date();
			const cachedTime = cachedCities[`${lat},${lng}`].cachedAt;
			const difference = currentTime - cachedTime;
			// discard weather data fetched more than 15 minutes ago
			if (difference > 1000 * 60 * 15) {
				cachedCities[`${lat},${lng}`] = undefined;
				presentWeather = await getPresentWeatherForCoordinates({ body: { lat, lng } }, undefined);
			}
			else {
				presentWeather = cachedCities[`${lat},${lng}`];
			}
		}
		else {
			presentWeather = await getPresentWeatherForCoordinates({ body : { lat, lng } }, undefined);
			cachedCities[`${lat},${lng}`] = presentWeather;
			cachedCities[`${lat},${lng}`].cachedAt = new Date();
		}
		return res.render("weather/present", { presentWeather });
	}
	catch (error) {
		return res.render("weather/error", { error: error.message });
	};
};

module.exports = { getPresentWeatherForCoordinatesInCache };