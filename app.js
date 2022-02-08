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
	rating: Number,
	description: String,
});

const Restaurant = new mongoose.model("Restaurant", restaurantSchema);

app.get("/", (req, res) => {
	res.render("home");
});

app.post("/restaurants", (req, res) => {
	const restaurantName = req.body.restaurantName;
	console.log(restaurantName);

	Restaurant.findOne({ name: restaurantName }, (err, foundRestaurant) => {
		if (err) console.log(err);
		else {
			if (foundRestaurant) {
				res.render("restaurant", {
					restaurantName: foundRestaurant.name,
					restaurantRating: foundRestaurant.rating,
					restaurantDescription: foundRestaurant.description,
				});
			} else {
				console.log("No restaurant found.");
			}
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

		Restaurant.findOne({ name: restaurantName }, (err, foundRestaurant) => {
			if (err) console.log(err);
			else {
				if (foundRestaurant) {
					console.log("Restaurant name already exists.");
				} else {
					const newRestaurant = new Restaurant({
						name: restaurantName,
						description: resutarantDescription,
					});

					newRestaurant.save(err => {
						if (err) console.log(err);
						else console.log("Successfully registered restaurant.");
					});
				}
			}
		});

		res.redirect("/");
	});

app.listen(3000, () => {
	console.log("Server is running on port 3000.");
});
