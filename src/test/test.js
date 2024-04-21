const request = require('supertest');
const express = require('express');
const app = require('../index'); // assuming your app file is named 'app.js'

describe('Test routes', () => {
  it('GET / responds with 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });

  it('GET /about responds with 200', async () => {
    const res = await request(app).get('/about');
    expect(res.statusCode).toEqual(200);
  });

  it('GET /cities responds with 200 and renders cities template', async () => {
    const res = await request(app).get('/cities');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Cities'); // assuming 'cities' template contains 'Cities'
  });
});

describe('Test database connection', () => {
  it('Database connection should be successful', async () => {
    const db = require('../services/database_service'); // adjust the path accordingly
    const connection = db.connect();
    expect(connection).toBeDefined();
  });
});
