const port = process.env.PORT || 3005;
const app = require('./app.js');

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
