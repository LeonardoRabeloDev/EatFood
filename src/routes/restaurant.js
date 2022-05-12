const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const Restaurant = require("../models/restaurant");
const router = new express.Router();

router.get("/", (req, res) => {
	Restaurant.find({}, (err, foundRestaurants) => {
		if (err) console.log(err);
		else {
			res.render("home", { restaurants: foundRestaurants });
		}
	});
});

router.get("/restaurants", (req, res) => {
	Restaurant.findOne({ name: req.query.restaurantName }, (err, foundRestaurant) => {
		if (err) console.log(err);
		else {
			res.render("restaurant", { restaurant: foundRestaurant });
		}
	});
});

router.get("/register", (req, res) => {
	res.render("register");
});

const upload = multer({
	limits: {
		fileSize: 1000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) return cb(new Error("Please upload a jpg/jpeg/png file."));

		cb(undefined, true);
	},
});

router.post("/register", upload.single("image"), (req, res) => {
	Restaurant.findOne({ name: req.body.restaurantName }, async (err, foundRestaurant) => {
		if (err) console.log(err);
		else {
			if (foundRestaurant) {
				console.log("Restaurant name already exists.");
			} else {
				const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
				
				const newRestaurant = new Restaurant({
					name: req.body.name,
					rating: req.body.rating,
					description: req.body.description,
					image: buffer,
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

router.get("/contact", (req, res) => {
	res.render("contact");
});

router.get("/about", (req, res) => {
	res.render("about");
});

module.exports = router;