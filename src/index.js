/* Import dependencies */
const express = require("express");
const mysql = require("mysql2");
const path = require("path");
import DatabaseService from "./services/database_service.js";

/* Create express instance */
const app = express();
const port = 3000;

/* Load view engine to render pug files */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const db = await DatabaseService.connect();
const { conn } = db;

/* Landing route */
app.get("/", (req, res) => {
  res.render('home');
});

// Returns about page
app.get("/about", (req, res) => {
  res.render("about");
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
