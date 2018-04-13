const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
const mongoUri = 'mongodb://localhost:27017/business';
const db = mongoose.connect(mongoUri);
var stuff = require('../../../foodeeData/las-vegas-restaurants.js');
// db.on('error', (err) => {console.log(err)});
// console.log(typeof stuff[0].business_id)
// console.log('shiiiiiiit')

// -153AjTW5luZPK4omEujWA default sausage kingdom

const businessSchema = new mongoose.Schema({
  business_id: String,
  name: String,
  neighborhood: String,
  address: String,
  city: String,
  state: String,
  postal_code: String,
  latitude: Number,
  longitude:Number,
  stars: Number,
  review_count: Number,
  is_open: Number,
  attributes: Object,
  categories: Array,
  hours:Object
});

// var data = [{"business_id": "--9e1ONYQuAa-CB_Rrw7Tw", "name": "Delmonico Steakhouse", "neighborhood": "The Strip", "address": "3355 Las Vegas Blvd S", "city": "Las Vegas", "state": "NV", "postal_code": "89109", "latitude": 36.123183, "longitude": -115.16919, "stars": 4.0, "review_count": 1451, "is_open": 1, "attributes": {"Alcohol": "full_bar", "HasTV": false, "NoiseLevel": "average", "RestaurantsAttire": "dressy", "BusinessAcceptsCreditCards": true, "Ambience": {"romantic": false, "intimate": false, "classy": true, "hipster": false, "divey": false, "touristy": false, "trendy": false, "upscale": true, "casual": false}, "RestaurantsGoodForGroups": true, "BYOBCorkage": "yes_corkage", "Caters": false, "WiFi": "no", "RestaurantsReservations": true, "BYOB": false, "RestaurantsTableService": true, "Corkage": true, "RestaurantsTakeOut": false, "GoodForKids": false, "WheelchairAccessible": true, "Open24Hours": false, "BikeParking": false, "OutdoorSeating": false, "RestaurantsPriceRange2": 4, "RestaurantsDelivery": false, "GoodForMeal": {"dessert": false, "latenight": false, "lunch": false, "dinner": true, "breakfast": false, "brunch": false}, "BusinessParking": {"garage": true, "street": false, "validated": false, "lot": false, "valet": true}}, "categories": ["Cajun/Creole", "Steakhouses", "Restaurants"], "hours": {"Monday": "11:30-14:00", "Tuesday": "11:30-14:00", "Friday": "11:30-14:00", "Wednesday": "11:30-14:00", "Thursday": "11:30-14:00", "Sunday": "11:30-14:00", "Saturday": "11:30-14:00"}}]

const Business = mongoose.model('Business', businessSchema);

// var business = new Business({business_id:stuff[0].business_id});
// business.save();
// var business = Business.create(stuff)
// console.log(Business.drop(business));
// var query = Business.find({business_id:'-153AjTW5luZPK4omEujWA'});
//   query.exec((err, businesses) => {
//     console.log(businesses[0].name);
// })

module.exports = Business;
