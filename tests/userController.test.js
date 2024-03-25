const request = require('supertest');
const app = require('../app');  
const User = require('../models/user');
const mongoose = require('mongoose');

describe('User Controller', () => {
  let token;
  let userId;

  // Dummy user data for testing
  const testUser = {
    name: 'Test User',
    email: 'test_user@example.com',
    password: 'testpassword'
  };

  beforeEach(async () => {
    // Create a test user before each test
    const user = new User(testUser);
    await user.save();
    userId = user._id;

    // Generate JWT token for authorization
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });
    token = response.body.token;
  });

  afterEach(async () => {
    // Clean up the database after each test
    await User.deleteMany();
  });

  describe('GET /api/users', () => {
    it('should get all users', async () => {
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1); 
    });
  });

  describe('GET /api/users/:id', () => {
    it('should get a single user by id', async () => {
      const response = await request(app)
        .get(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe(testUser.name);
    });

    it('should return 404 if user is not found', async () => {
      const response = await request(app)
        .get('/api/users/invalid-id')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update a user', async () => {
      const updatedUserData = { name: 'Updated Name' };
      const response = await request(app)
        .put(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedUserData);
  
      expect(response.status).toBe(200);
      expect(response.body.name).toBe(updatedUserData.name);
    });
  });
  
  describe('DELETE /api/users/:id', () => {
    it('should delete a user', async () => {
      const response = await request(app)
        .delete(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);
  
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User deleted successfully');
    });
  });
 
});
