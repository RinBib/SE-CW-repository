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