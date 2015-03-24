var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tripplanner');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));


//Schema Setup
var placeSchema = new mongoose.Schema({
  	address: String,
  	city: String,
  	state: String,
  	phone: String,
  	location: [Number]
});

var hotelSchema = new mongoose.Schema({
  	name: String,
  	place: [placeSchema],
  	num_stars: Number,
  	amenities: String
});

var thingToDoSchema = new mongoose.Schema({
  	name: String,
  	place: [placeSchema],
  	age_range: String
});

var restaurantSchema = new mongoose.Schema({
  	name: String,
  	place: [placeSchema],
  	cuisine: String,
  	price: Number
});


// Model Setup
var Place = mongoose.model('Place', placeSchema);
var Hotel = mongoose.model('Hotel', hotelSchema);
var ThingToDo = mongoose.model('ThingToDo', thingToDoSchema);
var Restaurant = mongoose.model('Restaurant', restaurantSchema);


//Export it
module.exports = {
  Place: Place,
  Hotel: Hotel,
  ThingToDo: ThingToDo,
  Restaurant: Restaurant
};