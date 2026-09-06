const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/userRoutes');

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

describe('User Routes', () => {
  it('should register a user', async () => {
    const response = await request(app).post('/api/users/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });

  it('should not login with invalid credentials', async () => {
    const response = await request(app).post('/api/users/login').send({
      email: 'wrong@example.com',
      password: 'wrongpassword'
    });
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('User not found');
  });
});