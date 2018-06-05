const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const restaurants = require('./las-vegas-restaurants.js');
const { db } = require('./Business.js');
const { Business } = require('./Business.js');

const query = Business.find();
const seed = () => {
  query.exec(() => { console.log('cleared database'); });
  const business = Business.create(restaurants)
    .then(() => query.exec((err, businesses) => { console.log(businesses.length); }))
    .then(() => db.disconnect());
};
Business.remove({}, seed);
