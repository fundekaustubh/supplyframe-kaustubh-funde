const axios = require('axios');
const { getPresentWeatherForCoordinates, getPresentWeatherForCity } = require('./weatherAPI');
const getHomePage = async (req, res) => {
	const { lat = undefined, lng = undefined } = req.query;
	try {
		if (lat === undefined || lng === undefined) {
			const presentWeather = await getPresentWeatherForCity({
				body: {
					'selected-city': 'New York'
				}
			}, undefined);
			return res.render('weather/show', { presentWeather });
		}
		else {
			const presentWeather = await getPresentWeatherForCoordinates({
				body: { lat, lng }
			}, undefined);
			if(presentWeather === undefined) throw new Error("No city found!");
			return res.render('weather/show', { presentWeather });
		}
	}
	catch (err) {
		return res.render('weather/error', { error: err.message });
	}
}
module.exports = { getHomePage };