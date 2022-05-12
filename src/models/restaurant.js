const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
	{
		name: String,
		rating: Number,
		description: String,
		image: String,
	},
);

const Restaurant = new mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
