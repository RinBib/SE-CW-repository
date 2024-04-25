// Import the module
const db = require('./database_service');
const mysql = require("mysql");

// Mock the mysql module
jest.mock('mysql', () => ({
  createConnection: jest.fn(() => ({
    connect: jest.fn(),
    end: jest.fn()
  }))
}));

describe('Database connection setup', () => {
  it('creates a connection with correct configuration', () => {
    // Check if createConnection function is called with correct options
    expect(mysql.createConnection).toHaveBeenCalledWith({
      host: process.env.DATABASE_HOST || "localhost",
      user: "user",
      password: "password",
      database: "world",
    });
  });
});
