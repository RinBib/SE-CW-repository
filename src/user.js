// encrypt and compare passwords
const bcrypt = require("bcryptjs");

async setUserPassword(password) 
{
    const pw = await bcrypt.hash(password, 10);
    var sql = "UPDATE Users SET password = ? WHERE Users.id = ?"
    const result = await db.query(sql, [pw, this.id]);
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

 }
 // Add a password to an existing user
 async setUserPassword(password) {
 }

 // Add a new record to the users table
 async addUser(password) {

 }
 // Test a submitted password against a stored password
 async authenticate(submitted) {
 }
}
module.exports = {
 User
}

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