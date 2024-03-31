const mysql = require("mysql")

/* Setup database connection */
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST || "localhost",
    user: "user",
    password: "password",
    database: "world",
  });

// database_service.js
module.exports = db;
