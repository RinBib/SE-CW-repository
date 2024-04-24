const express = require('express');
const request = require('supertest');
const app = express();

// Mock the database service
const db = {
  execute: jest.fn() // Mock the execute method
};

// Import the route handler function
const getCitiesRouteHandler = require('./getCitiesRouteHandler');

// Define the route using the route handler function
app.get("/cities", getCitiesRouteHandler(db));

describe('GET /cities', () => {
  it('responds with 200 and renders cities template', async () => {
    // Mock data to simulate the rows returned from the database
    const mockRows = [{ id: 1, name: 'City 1' }, { id: 2, name: 'City 2' }];

    // Mock the execute method to return mock data
    db.execute.mockImplementation((query, callback) => {
      // Simulate the callback with mock data
      callback(null, mockRows, null);
    });

    // Make a GET request to the route
    const response = await request(app).get('/cities');

    // Expect the response to have a status code of 200
    expect(response.status).toEqual(200);

    // Expect the response to render the 'cities' template with the mock rows
    expect(response.text).toContain('City 1');
    expect(response.text).toContain('City 2');
  });
});
