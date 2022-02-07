const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/eatFoodDB");

const restaurantSchema = new mongoose.Schema({
	name: String,
	description: String,
});

const Restaurant = new mongoose.model("Restaurant", restaurantSchema);

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/restaurants/:query", (req, res) => {
	const query = req.params.query;

	Restaurant.findOne({ name: query }, (err, foundRestaurant) => {
		if (err) console.log(err);
		else {
			res.send(foundRestaurant);
		}
	});
});

app.route("/register")
	.get((req, res) => {
		res.render("register");
	})

	.post((req, res) => {
		const restaurantName = req.body.name;
		const resutarantDescription = req.body.description;

		const newRestaurant = new Restaurant({
			name: restaurantName,
			description: resutarantDescription,
		});

		newRestaurant.save(err => {
			if (err) console.log(err);
			else console.log("Successfully registered restaurant.");
		});
	});

app.listen(3000, () => {
	console.log("Server is running on port 3000.");
});
