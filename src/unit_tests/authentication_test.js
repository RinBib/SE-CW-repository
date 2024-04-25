const app = require('./index'); // assuming your Express app is defined in app.js
const request = require('supertest');
const User = require('./user'); // assuming User module is defined in User.js

// Mock User module
jest.mock('./User', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    getIdFromEmail: jest.fn().mockResolvedValue(123), // Mock getIdFromEmail method to resolve with user ID
    authenticate: jest.fn().mockResolvedValue(true) // Mock authenticate method to resolve with true (matched password)
  }))
}));

describe('POST /authenticate', () => {
  it('responds with redirect when authentication succeeds', async () => {
    const response = await request(app)
      .post('/authenticate')
      .send({ email: 'test@example.com', password: 'password123' });

    // Expect a redirect response with the correct URL
    expect(response.status).toBe(302); // 302 is the status code for redirect
    expect(response.headers.location).toBe('/single-student/123');
  });

  it('responds with "invalid password" when password does not match', async () => {
    // Mock authenticate method to resolve with false (password doesn't match)
    User.mockImplementationOnce(() => ({
      authenticate: jest.fn().mockResolvedValue(false)
    }));

    const response = await request(app)
      .post('/authenticate')
      .send({ email: 'test@example.com', password: 'wrongpassword' });

    // Expect response with "invalid password" message
    expect(response.status).toBe(200);
    expect(response.text).toBe('invalid password');
  });

  it('responds with "invalid email" when user ID is not found', async () => {
    // Mock getIdFromEmail method to resolve with null (user ID not found)
    User.mockImplementationOnce(() => ({
      getIdFromEmail: jest.fn().mockResolvedValue(null)
    }));

    const response = await request(app)
      .post('/authenticate')
      .send({ email: 'nonexistent@example.com', password: 'password123' });

    // Expect response with "invalid email" message
    expect(response.status).toBe(200);
    expect(response.text).toBe('invalid email');
  });
});
