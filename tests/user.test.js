const request = require('supertest');
const app = require('../src/server');

describe('User Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        password: 'testpass'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User created successfully');
  });

  it('should login with valid credentials', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        username: 'testuser',
        password: 'testpass'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
