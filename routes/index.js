var router = require("express").Router();
var Hotel = require("../models").Hotel;
var Restaurant = require("../models").Restaurant;
var ThingToDo = require("../models").ThingToDo;


router.get("/", function (req, res, next){

	Hotel.find({}, function(err, hotels) {
	    Restaurant.find({}, function(err, restaurants) {
	        ThingToDo.find({}, function(err, thingsToDo) {
	            res.render('index', {
	                all_hotels: hotels,
	                all_restaurants: restaurants,
	                all_things_to_do: thingsToDo
	        	});
	     	});
	 	});
	});

});

module.exports = router;