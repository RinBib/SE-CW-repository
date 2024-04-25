const express = require("express");
const path = require("path");
const bodyParser = require("body-parser"); // Added body-parser
const session = require('express-session');
const DatabaseService = require("./services/database_service");
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Body parser middleware
app.use(session({
  secret: 'secretkeysdfjsflyoifasd',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Database connection
const db = DatabaseService.connect();

// Views setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Routes
app.get("/", (req, res) => {
  res.render('home');
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/cities", (req, res) => {
  db.execute("SELECT * FROM `city`", (err, rows, fields) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    console.log(`/cities: ${rows.length} rows`);
    return res.render('cities', { rows: rows });
  });
});

// Register
app.get('/register', function (req, res) {
  res.render('data/register');
});

// Login
app.get('/login', function (req, res) {
  res.render('login');
});

// Set password for existing user or add new user
app.post('/set-password', function (req, res) {
  // Assuming User class is defined or imported correctly
  const params = req.body;
  const user = new User(params.email);
  user.getIdFromEmail().then(uId => {
    if (uId) {
      user.setUserPassword(params.password).then(result => {
        res.redirect('/single-student/' + uId);
      }).catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
    } else {
      user.addUser(params.email).then(() => {
        res.send('Perhaps a page where a new user sets a programme');
      }).catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
    }
  }).catch(err => {
    console.error(`Error while adding password `, err.message);
    res.status(500).send('Internal Server Error');
  });
});

// Authenticate user
app.post('/authenticate', function (req, res) {
  const params = req.body;
  const user = new User(params.email);
  user.getIdFromEmail().then(uId => {
    if (uId) {
      user.authenticate(params.password).then(match => {
        if (match) {
          res.redirect('/single-student/' + uId);
        } else {
          res.send('Invalid password');
        }
      }).catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
    } else {
      res.send('Invalid email');
    }
  }).catch(err => {
    console.error(`Error while comparing `, err.message);
    res.status(500).send('Internal Server Error');
  });
});

// Logout
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/login');
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
