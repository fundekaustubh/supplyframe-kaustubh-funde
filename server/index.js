const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");

const weatherAPIRoutes = require("./routes/weatherAPI");
const weatherRoutes = require("./routes/weather.js");

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'data')));
app.use(express.urlencoded({ extended: true }));

app.use("/api/weather", weatherAPIRoutes);
app.use("/", weatherRoutes);
app.use("*", (req, res) => {
	res.redirect("/");
});

app.listen(3000, () => {
	console.log("Serving on port 3000...")
});