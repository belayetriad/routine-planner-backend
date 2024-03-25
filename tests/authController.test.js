const request = require('supertest');
const app = require('../app');  
const User = require('../models/user');


describe('Authentication Endpoints', () => {
  let token;

  // Register
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test Name',
        email: 'test@example.com',
        password: 'password123'
      });
      
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;   
  });

  

  // Login
  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
      
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;  
  });

  // Test protected route
  it('should get a protected resource', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);
      
    expect(res.statusCode).toBe(200);
    
  });
 
});
