const insertLocation = (req, res, next) => {
	const { query } = req;
	if (query.lat === undefined || query.lng === undefined) {
		req.query.lat = 40.6943;
		req.query.lng = -73.9249;
		return res.redirect(`${process.env.HOST_URL}?lat=${req.query.lat}&lng=${req.query.lng}`);
	}
	next();
}

module.exports = { insertLocation };