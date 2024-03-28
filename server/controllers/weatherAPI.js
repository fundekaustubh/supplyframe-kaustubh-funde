const axios = require("axios");
const cities = require("../data/cities/cities.json");
const getPresentWeatherForCoordinates = async (req, res) => {
	const { data: _presentWeather } = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${req.body.lat}&longitude=${req.body.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,wind_speed_10m&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=auto`);
	// const _presentWeather = {
	// 	current: {
	// 		temperature_2m: 70,
	// 		relative_humidity_2m: 0.5,
	// 		apparent_temperature: 70,
	// 		is_day: true,
	// 		precipitation: 0,
	// 		wind_speed_10m: 0
	// 	},
	// 	current_units: {
	// 		temperature_2m: "°F",
	// 		relative_humidity_2m: "%",
	// 		apparent_temperature: "°F",
	// 		precipitation: "in",
	// 		wind_speed_10m: "mph"
	// 	}
	// };
	const presentWeather = {
		temperature: {
			value: _presentWeather.current.temperature_2m,
			unit: _presentWeather.current_units.temperature_2m
		},
		humidity: {
			value: _presentWeather.current.relative_humidity_2m,
			unit: _presentWeather.current_units.relative_humidity_2m
		},
		apparentTemperature: {
			value: _presentWeather.current.apparent_temperature,
			unit: _presentWeather.current_units.apparent_temperature
		},
		isDay: _presentWeather.current.is_day,
		precipitation: {
			value: _presentWeather.current.precipitation,
			unit: _presentWeather.current_units.precipitation
		},
		windSpeed: {
			value: _presentWeather.current.wind_speed_10m,
			unit: _presentWeather.current_units.wind_speed_10m
		}
	};
	return res.render('weather/show', { presentWeather });
};

const getPresentWeatherForCity = async (req, res) => {
	const { body } = req;
	const selectedCity = body['selected-city'].split(", ")[0];
	const { lat, lng } = cities.filter(city => city.city === selectedCity)[0];
	return getPresentWeatherForCoordinates({
		...req,
		body: {
			...body, lat, lng
		}
	}, res);
};

module.exports = {
	getPresentWeatherForCoordinates,
	getPresentWeatherForCity
}