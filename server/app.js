const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const { Business } = require('./db/Business.js');

const cors = require('cors');

app.use(morgan('dev'));
app.use(cors({ origin: '*' }));
app.get('/api/:id', (req, res) => {
  const business_id = req.params.id;
  const query = Business.find({ business_id });
  query.exec((err, businesses) => {
    const selectedBusiness = businesses[0];
    const categoryArr = businesses[0].categories;
    for (let i = 0; i < categoryArr.length; i += 1) {
      if (categoryArr[i] === 'Restaurants') {
        categoryArr.splice(i, 1);
        i -= 1;
      }
    }
    const query = Business.find({ categories: { $in: categoryArr } });
    query.exec((err, businesses) => {
      if (businesses.length > 3) {
        for (let i = 0; i < businesses.length; i += 1) {
          if (businesses[i].business_id === business_id) {
            businesses.splice(i, 1);
            i -= 1;
          }
        }
      }
      res.end(JSON.stringify([selectedBusiness, businesses]));
    });
  });
});

app.get('/biz/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/'));
});
app.use(express.static(path.join(__dirname, '../public/')));

module.exports = app;
