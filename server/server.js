const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3005;
const Business = require('./db/Business.js');

// console.log(path.join(__dirname, '../public'));
app.use(morgan('dev'));

app.get('/api/:id', (req, res) => {
  var business_id = req.url.split('/api/:')[1];
  // console.log(business_id);
  var query = Business.find({business_id:business_id});
  query.exec((err, businesses) => {
    var selectedBusiness = businesses[0];
    var categoryArr = businesses[0].categories;
    for (var i =0; i < categoryArr.length; i++) {
      if (categoryArr[i] === 'Restaurants') {
        categoryArr.splice(i, 1);
        i--;
      }
    }
    var query = Business.find({categories:{$in:categoryArr}});
    query.limit(3);
    query.exec((err, businesses) => {
      res.end(JSON.stringify([selectedBusiness, businesses]));
    })
  })
})

app.get('/biz/:id', (req, res) => {
  var business_id = req.url.split('/biz/:')[1];
  // console.log(buisness_id);
  res.sendFile(path.join(__dirname, '../public/'))
})
app.use(express.static(path.join(__dirname, '../public/')));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
