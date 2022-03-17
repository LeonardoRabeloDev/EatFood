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
	image: {
		data: Buffer,
		contentType: String,
	},
});

const Restaurant = new mongoose.model("Restaurant", restaurantSchema);

app.get("/", (req, res) => {
	Restaurant.find({}, (err, foundRestaurants) => {
		if (err) console.log(err);
		else {
			res.render("home", { restaurants: foundRestaurants });
		}
	});
});

app.get("/restaurants", (req, res) => {
	Restaurant.findOne({ name: req.query.restaurantName }, (err, foundRestaurant) => {
		if (err) console.log(err);
		else {
			res.render("restaurant", { restaurant: foundRestaurant });
		}
	});
});

app.route("/register")
	.get((req, res) => {
		res.render("register");
	})

	.post((req, res) => {
		console.log(req.body.image);
		Restaurant.findOne({ name: req.body.restaurantName }, (err, foundRestaurant) => {
			if (err) console.log(err);
			else {
				if (foundRestaurant) {
					console.log("Restaurant name already exists.");
				} else {
					const newRestaurant = new Restaurant({
						name: req.body.name,
						rating: req.body.rating,
						description: req.body.description,
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

app.get("/contact", (req, res) => {
	res.render("contact");
});

app.get("/about", (req, res) => {
	res.render("about");
});

app.listen(3000, () => {
	console.log("Server is running on port 3000.");
});
