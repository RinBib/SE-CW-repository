const express = require("express");
const path = require("path");
const connection = require("./services/database_service.js");
const app = express();
const session = require('express-session');

// Use a favicon for the site
app.use('/static/favicon.ico', express.static(path.join(__dirname, './static/favicon.ico')));

// Assets Server
app.use(express.static(path.join(__dirname, 'static')));

// allows the site to know if a user is logged in, and the id of said user
app.use(session({
  secret: 'secretkeysdfjsflyoifasd',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get("/", (req, res) => {
  res.render('home');
});

app.get("/cities", async (req, res) => {
  const sql = "SELECT * FROM `city`";
  try {
    const [rows, fields] = await connection.query(sql);
    res.render('cities', {rows});
  } catch (error) {
    console.error(error);
    if (error.code === 'ER_NO_SUCH_TABLE') {
      res.status(500).send("Database table does not exist.");
    } else {
      res.status(500).send("An error occurred.");
    }
  }
});

app.get("/countries", async (req, res) => {
  const sql = "SELECT * FROM `country`";
  try {
    const [rows, fields] = await connection.query(sql);
    res.render('countries', {rows});
  } catch (error) {
    console.error(error);
    if (error.code === 'ER_NO_SUCH_TABLE') {
      res.status(500).send("Database table does not exist.");
    } else {
      res.status(500).send("An error occurred.");
    }
  }
});

app.get("/countrylanguages", async (req, res) => {
  const sql = "SELECT * FROM `countrylanguage`";
  try {
    const [rows, fields] = await connection.query(sql);
    res.render('countrylanguages', {rows});
  } catch (error) {
    console.error(error);
    if (error.code === 'ER_NO_SUCH_TABLE') {
      res.status(500).send("Database table does not exist.");
    } else {
      res.status(500).send("An error occurred.");
    }
  }
});

module.exports = app;

if (require.main === module) {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// register
app.get('/data/register', function (req, res) {
  res.render('register');
 });

 // login
 app.get('/data/login', function (req, res) {
  res.render('login');
 });

// add password to existing user if there is one
app.post('/set-password', function (req, res) 
{
  params = req.body;
  var user = new User(params.email);
  try {
      user.getIdFromEmail().then( uId => 
      {
          if(uId) 
          {
              // If a valid, existing user is found, set the password and redire 
              user.setUserPassword(params.password).then ( result => {
                  res.redirect('/single-student/' + uId);
              });
          }
          else {
              // If no existing user is found, add a new one
              user.addUser(params.email).then( Promise => {
                  res.send('Perhaps a page where a new user sets a programme');
              });
          }
      })
  } catch (err) {
      console.error(`Error while adding password `, err.message);
  }
});

// redirect the user after comparing password or display error
app.post('/authenticate', function (req, res) {
  params = req.body;
  var user = new User(params.email);
  try {
    user.getIdFromEmail().then(uId => {
    if (uId) {
      user.authenticate(params.password).then(match => {
        if (match) {
          res.redirect('/single-student/' + uId);
        }
        else {
          res.send('invalid password');
        }
      });
    }
    else {
      res.send('invalid email');
    }
  })
} catch (err) {
  console.error(`Error while comparing `, err.message);
}
});

// Logout
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/login');
});