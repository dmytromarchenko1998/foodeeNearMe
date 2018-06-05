const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const mongoUri = 'mongodb://localhost/business';
const db = mongoose.connect(mongoUri);

const businessSchema = new mongoose.Schema({
  business_id: String,
  name: String,
  neighborhood: String,
  address: String,
  city: String,
  state: String,
  postal_code: String,
  latitude: Number,
  longitude: Number,
  stars: Number,
  review_count: Number,
  is_open: Number,
  attributes: Object,
  categories: Array,
  hours: Object,
});

const Business = mongoose.model('Business', businessSchema);

module.exports.Business = Business;
module.exports.db = db;
