const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3005;
const Business = require('./db/Business.js');

// console.log(path.join(__dirname, '../public'));
app.use(morgan('dev'));

app.get('/biz/:id', (req, res) => {
  var buisness_id = req.url.split('/biz/:')[1];
  // console.log(buisness_id);
  res.sendFile(path.join(__dirname, '../public/'))
})
app.use(express.static(path.join(__dirname, '../public/')));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
