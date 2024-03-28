const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");
const redis = require("redis");
const redisClient = redis.createClient();

const weatherAPI = require("./routes/weatherAPI");

const cache = async (req, res, next) => {
	// console.log(redisClient);
	next();
}

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cache);
console.log(path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'data')));
app.use(express.urlencoded({ extended: true }));

app.use("/api/weather", weatherAPI);

app.listen(3000, () => {
	console.log("Serving on port 3000...")
});