const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
	{
		name: String,
		rating: Number,
		description: String,
		image: {
			type: Buffer,
		},
	},
	{
		timestamps: true,
	},
);

const Restaurant = new mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
