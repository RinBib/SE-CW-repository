/* Import dependencies */
const express = require("express");
const mysql = require("mysql2");
const path = require("path");

/* Create express instance */
const app = express();
const port = 3000;

/* Load view engine to render pug files */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* */

/* Setup database connection */
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST || "localhost",
  user: "user",
  password: "password",
  database: "world",
});

/* Landing route */
app.get("/", (req, res) => {
  res.render('home');
});

// Sample API route
app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/city", (req, res) => {
  res.render('city');
});

// Returns an array of cities from the database
app.get("/cities", (req, res) => {
  db.execute("SELECT * FROM `city`", (err, rows, fields) => {
    console.log(`/cities: ${rows.length} rows`);
    return res.render('cities', {rows:rows});
  });
});

// Run server!
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
