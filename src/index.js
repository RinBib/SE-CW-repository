const express = require("express");
const path = require("path");
const DatabaseService = require("./services/database_service");

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

// register
app.get('/data/register', function (req, res) {
  res.render('data/register');
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
  // TODO improve the user journey here
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