const express = require("express");
require("./db/mongoose");
const bodyParser = require("body-parser");
const restaurantRout = require("./routes/restaurant");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(restaurantRout);

module.exports = app;
