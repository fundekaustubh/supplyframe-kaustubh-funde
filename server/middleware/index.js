const insertLocation = (req, res, next) => {
	const { query } = req;
	console.log("middleware hit!");
	if (query.lat === undefined && query.lng === undefined) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async function (position) {
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;
				req.query.lat = latitude;
				req.query.lng = longitude;
				next();
			});
		} else {
			req.query.lat = 40.6943;
			req.query.lng = -73.9249;
			next();
		}
	}
	else {
		next();
	}
}

module.exports = { insertLocation };