const axios = require("axios");
const cities = require("../data/cities/cities.json");
const min = (a, b) => a < b ? a : b;
const max = (a, b) => a > b ? a : b;
const weatherCodes = {
	0: "Sunny",
	1: "Partly Cloudy",
	2: "Mostly Cloudy",
	3: "Overcast",
	45: "Fog",
	48: "Rime",
	51: "Drizzle",
	52: "Drizzle",
	53: "Drizzle",
	55: "Drizzle",
	56: "Drizzle",
	57: "Drizzle",
	61: "Rain",
	63: "Rain",
	65: "Rain",
	66: "Rain",
	67: "Rain",
	71: "Light Snow",
	73: "Moderate Snow",
	75: "Heavy Snow",
	77: "Snow",
	80: "Rain",
	81: "Rain",
	82: "Rain",
	85: "Snow",
	86: "Snow",
	95: "Thunderstorm",
	96: "Thunderstorm",
	99: "Thunderstorm"
};

const videoLinks = {
	'Sunny': 'https://videos.pexels.com/video-files/853880/853880-hd_1920_1080_24fps.mp4',
	'Partly Cloudy': 'https://videos.pexels.com/video-files/6772137/6772137-hd_1920_1080_30fps.mp4',
	'Mostly Cloudy': 'https://videos.pexels.com/video-files/855785/855785-hd_1920_1080_24fps.mp4',
	'Overcast': 'https://videos.pexels.com/video-files/7300342/7300342-hd_1920_1080_25fps.mp4',
	'Fog': 'https://videos.pexels.com/video-files/2711111/2711111-hd_1920_1080_24fps.mp4',
	'Rime': 'https://videos.pexels.com/video-files/7461176/7461176-hd_1920_1080_25fps.mp4',
	'Drizzle': 'https://videos.pexels.com/video-files/3813820/3813820-hd_1920_1080_24fps.mp4',
	'Rain': 'https://videos.pexels.com/video-files/5197762/5197762-hd_1920_1080_25fps.mp4',
	'Light Snow': 'https://videos.pexels.com/video-files/857032/857032-hd_1920_1080_30fps.mp4',
	'Moderate Snow': 'https://videos.pexels.com/video-files/3700846/3700846-hd_1920_1080_30fps.mp4',
	'Heavy Snow': 'https://videos.pexels.com/video-files/854881/854881-hd_1920_1080_25fps.mp4',
	'Snow': 'https://videos.pexels.com/video-files/854860/854860-hd_1920_1080_25fps.mp4',
	'Thunderstorm': 'https://videos.pexels.com/video-files/6190836/6190836-hd_1920_1080_30fps.mp4'
}

const getPresentWeatherForCoordinates = async (req, res) => {
	// https://api.open-meteo.com/v1/forecast?latitude=${req.body.lat}&longitude=${req.body.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,cloud_cover,wind_speed_10m,wind_direction_10m&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=auto
	const { data: _presentWeather } = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${req.body.lat}&longitude=${req.body.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunset,uv_index_max,precipitation_sum&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=auto`);
	console.log(_presentWeather);
	const { city, country } = cities.filter(city => city.lat == req.body.lat && city.lng == req.body.lng)[0];
	const hours = _presentWeather.daily.sunset[0].match(/\d\d:\d\d/)[0].split(':')[0];
	const minutes = _presentWeather.daily.sunset[0].match(/\d\d:\d\d/)[0].split(':')[1];
	const hourDegrees = (hours % 12) * 30 + minutes * 0.5;
	const minuteDegrees = minutes * 6;
	const forecastedParameters = _presentWeather.daily.time.map((day, index) => {
		const averageTemperature = (_presentWeather.daily.apparent_temperature_min[index] + _presentWeather.daily.apparent_temperature_max[index]) / 2;
		const minTemperature = min(_presentWeather.daily.apparent_temperature_min[index], _presentWeather.daily.temperature_2m_min[index]);
		const maxTemperature = max(_presentWeather.daily.apparent_temperature_max[index], _presentWeather.daily.temperature_2m_max[index]);
		console.log("min: ", minTemperature, "max: ", maxTemperature, "average: ", averageTemperature, "percentage: ", ((averageTemperature - minTemperature) / (maxTemperature - minTemperature)) * 100);
		return {
			day: new Date(day).toLocaleTimeString('en-US', { weekday: 'long' }).slice(0, 3),
			temperature: {
				max: {
					value: maxTemperature,
					unit: _presentWeather.daily_units.temperature_2m_max
				},
				min: {
					value: minTemperature,
					unit: _presentWeather.daily_units.temperature_2m_min
				},
				average: {
					value: averageTemperature,
					unit: _presentWeather.daily_units.temperature_2m_max,
					percentage: ((averageTemperature - minTemperature) / (maxTemperature - minTemperature)) * 100
				}
			},
			precipitation: {
				value: _presentWeather.daily.precipitation_sum[index],
				unit: _presentWeather.daily_units.precipitation_sum
			},
			weatherCode: weatherCodes[_presentWeather.daily.weather_code[index]]
		}
	});
	forecastedParameters[0].day = 'Today';
	const presentWeather = {
		city: {
			name: city,
			lat: req.body.lat,
			lng: req.body.lng
		},
		country,
		isDay: _presentWeather.current.is_day,
		weatherCode: _presentWeather.current.is_day ? weatherCodes[_presentWeather.current.weather_code] : "Night",
		backgroundVideo: _presentWeather.current.is_day ? videoLinks[weatherCodes[_presentWeather.current.weather_code]] : 'https://videos.pexels.com/video-files/9341381/9341381-hd_1920_1080_24fps.mp4',
		sunset: {
			hours, minutes, hourDegrees, minuteDegrees
		},
		forecastedParameters,
		currentParameters: {
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
			precipitation: {
				value: _presentWeather.current.precipitation,
				unit: _presentWeather.current_units.precipitation
			},
			windSpeed: {
				value: _presentWeather.current.wind_speed_10m,
				unit: _presentWeather.current_units.wind_speed_10m
			},
			windDirection: {
				value: _presentWeather.current.wind_direction_10m,
				unit: _presentWeather.current_units.wind_direction_10m
			},
			uvIndex: {
				value: _presentWeather.daily.uv_index_max[0]
			},
			cloudCover: {
				value: _presentWeather.current.cloud_cover,
				unit: _presentWeather.current_units.cloud_cover
			},
			precipitationSum: {
				today: {
					value: _presentWeather.daily.precipitation_sum[0],
					unit: _presentWeather.daily_units.precipitation_sum
				},
				tomorrow: {
					value: _presentWeather.daily.precipitation_sum[1],
					unit: _presentWeather.daily_units.precipitation_sum
				}
			}
		}
	};
	console.log(presentWeather);
	if(res === undefined) return presentWeather;
	return res.json(presentWeather);
};

const getPresentWeatherForCity = async (req, res) => {
	const { body } = req;
	const selectedCity = body['selected-city'].split(", ")[0];
	const { lat, lng } = cities.filter(city => city.city === selectedCity)[0];
	return res.redirect(`http://localhost:3000?lat=${lat}&lng=${lng}`);
};

module.exports = {
	getPresentWeatherForCoordinates,
	getPresentWeatherForCity
}