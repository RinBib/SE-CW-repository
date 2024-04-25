const mysql = require('mysql2/promise');

/* Setup database connection */
// The connection allow us to make requests to the database.
const connection = mysql.createPool({
  host: process.env.DATABASE_HOST || "localhost",
  user: "user",
  password: "password",
  database: "world",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// database_service.js
module.exports = connection;
