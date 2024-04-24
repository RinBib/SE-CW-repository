const express = require('express');
const session = require('express-session');
const request = require('supertest');

const app = express();

// Middleware setup
app.use(session({
  secret: 'secretkeysdfjsflyoifasd',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Define a route for testing purposes
app.get('/', (req, res) => {
  res.send('Hello World');
});

describe('Express session middleware setup', () => {
  it('correctly configures express-session middleware', async () => {
    const response = await request(app).get('/');
    
    // Expect that the route is reachable (not blocked by middleware)
    expect(response.status).toBe(200);
  });
});

