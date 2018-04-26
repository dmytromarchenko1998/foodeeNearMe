const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const restaurants = require('./las-vegas-restaurants.js');
const db = require('./Business.js').db;
const Business = require('./Business.js').Business;
var query = Business.find();
var business = Business.create(restaurants)
  .then(()=> query.exec((err, businesses) => {console.log(businesses.length)}))
  .then(()=> db.disconnect())
// console.log(restaurants)