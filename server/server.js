const express = require('express');
const morgan = require('morgan');
const path = require('path');
const port = process.env.PORT || 3005;
const Business = require('./db/Business.js');
const app = require('./app.js');

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
