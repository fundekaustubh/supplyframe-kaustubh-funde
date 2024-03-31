const weatherAPIControllers = require('../controllers/weatherAPI');
test("Test today's weather in New York.", async () => {
	const req = {
		body: {
			lat: 40.6943,
			lng: -73.9249
		}
	};
	const response = await weatherAPIControllers.getPresentWeatherForCoordinates(req, undefined);
	expect(response.city.name).toBe("New York");
});