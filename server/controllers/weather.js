const axios = require('axios');
const { getPresentWeatherForCoordinates, getPresentWeatherForCity } = require('./weatherAPI');
const getHomePage = async (req, res) => {
	// const presentWeather = await getPresentWeatherForCoordinates(req);
	const { lat = undefined, lng = undefined } = req.query;
	console.log("lat and lng", lat, lng);
	if (lat === undefined && lng === undefined) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async function (position) {
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;
				const presentWeather = await getPresentWeatherForCoordinates({
					body: {
						lat: latitude,
						lng: longitude
					}
				}, undefined);
				return res.render('weather/show', { presentWeather });
			});
		} else {
			const presentWeather = await getPresentWeatherForCity({
				body: {
					'selected-city': 'New York'
				}
			}, undefined);
			console.log("cannot find geolocation, ", res);
			return res.render('weather/show', { presentWeather });
		}
	}
	else {
		const presentWeather = await getPresentWeatherForCoordinates({
			body: { lat, lng }
		}, undefined);
		return res.render('weather/show', { presentWeather });
	}
}
module.exports = { getHomePage };