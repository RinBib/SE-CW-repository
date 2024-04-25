const express = require("express");
const path = require("path");
const DatabaseService = require("/services/database_service");

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const db = DatabaseService.connect();

app.get("/", (req, res) => {
  res.render('home');
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/cities", (req, res) => {
  db.execute("SELECT * FROM `city`", (err, rows, fields) => {
    console.log(`/cities: ${rows.length} rows`);
    return res.render('cities', {rows:rows});
  });
});

module.exports = app;

if (require.main === module) {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
