// encrypt and compare passwords
const bcrypt = require("bcryptjs");

async setUserPassword(password) 
{
    const pw = await bcrypt.hash(password, 10);
    var sql = "UPDATE Users SET password = ? WHERE Users.id = ?"
    const result = await db.query(sql, [pw, this.id]);
    return true;
}

// create new record for new user
async addUser(password) 
{
    const pw = await bcrypt.hash(password, 10);
    var sql = "INSERT INTO Users (email, password) VALUES (? , ?)";
    const result = await db.query(sql, [this.email, pw]);
    console.log(result.insertId);
    this.id = result.insertId;
    return true;
}

// require user
const { User } = require("./src/user");

// require database_service
const db = require('../services/database_service.js');

class User {
  // Id of the user
  id;
  // Email of the user
  email;

  constructor(email) {
    this.email = email;
  }

  // Get an existing user id from an email address, or return false if not found
  async getIdFromEmail() {
    const query = 'SELECT id FROM users WHERE email = ?';
    const [rows, _] = await db.execute(query, [this.email]);
    if (rows.length > 0) {
      return rows[0].id;
    } else {
      return false;
    }
  }

  // Add a password to an existing user
  async setUserPassword(password) {
    const userId = await this.getIdFromEmail();
    if (!userId) {
      throw new Error('User not found');
    }
    const query = 'UPDATE users SET password = ? WHERE id = ?';
    await db.execute(query, [password, userId]);
  }

  // Add a new record to the users table
  async addUser(password) {
    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    await db.execute(query, [this.email, password]);
  }

  // Test a submitted password against a stored password
  async authenticate(submitted) {
    const query = 'SELECT password FROM users WHERE email = ?';
    const [rows, _] = await db.execute(query, [this.email]);
    if (rows.length > 0) {
      const storedPassword = rows[0].password;
      return storedPassword === submitted;
    } else {
      return false;
    }
  }
}

module.exports = {
  User
};


// check if entered email exists in the database
async getIdFromEmail() 
{
    var sql = "SELECT id FROM Users WHERE Users.email = ?";
    const result = await db.query(sql, [this.email]);
    // TODO LOTS OF ERROR CHECKS HERE..
    if (JSON.stringify(result) != '[]') {
        this.id = result[0].id;
        return this.id;
    }
    else {
        return false;
    }
}

// compare entered password against passwored stored in database
async authenticate(submitted)
{
    var sql = "SELECT password FROM Users WHERE id = ?";
    const result = await db.query(sql, [this.id]);
    const match = await bcrypt.compare(submitted, result[0].password);
    if (match == true) {
        return true;
    }
    else {
        return false;
    }
}

// set sessions
app.post('/authenticate', function (req, res) {
    params = req.body;
    var user = new User(params.email);
    try {
        user.getIdFromEmail().then(uId => {
            if (uId) {
                user.authenticate(params.password).then(match => {
                    if (match) {
                        // Set the session for this user
                        req.session.uid = uId;
                        req.session.loggedIn = true;
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