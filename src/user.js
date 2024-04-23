// Get the functions in the db.js file to use
const db = require('../services/db');
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