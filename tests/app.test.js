const request = require('supertest');
const app = require('../app');  
const User = require('../models/user');


describe('Authentication Endpoints', () => {
  let token; 
  let userId;
  let classSessionId;

  // Dummy data for testing
  const testUser = {
    name: 'Test User',
    email: 'test_user@example.com',
    password: 'testpassword'
  };

  const testClassSession = {
    name: 'Test Class Session',
    duration: '1',
    priority: 3
  };
 
  afterAll(async () => {
    await User.deleteMany();
  });
  
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
    userId = res.body.user._id;
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




  // users

  describe('GET /api/users', () => {
    console.log(token);
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



  describe('Class Session Controller', () => {
    
  
    it('should create a new class session', async () => {
      const response = await request(app)
        .post('/api/class-session')
        .set('Authorization', `Bearer ${token}`)
        .send(testClassSession);
  
      expect(response.status).toBe(200);
      expect(response.body.name).toBe(testClassSession.name);
      classSessionId = response.body._id; // Store the created class session ID for later tests
    });
  
    it('should get all class sessions', async () => {
      const response = await request(app)
        .get('/api/class-session')
        .set('Authorization', `Bearer ${token}`);;
  
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  
    it('should get a class session by ID', async () => {
      const response = await request(app)
        .get(`/api/class-session/${classSessionId}`)
        .set('Authorization', `Bearer ${token}`);;
  
      expect(response.status).toBe(200);
      expect(response.body.name).toBe(testClassSession.name);
    });
  
    it('should update a class session', async () => {
      const updatedClassSession = { name: 'Updated Class Session Name' };
      const response = await request(app)
        .put(`/api/class-session/${classSessionId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedClassSession);
  
      expect(response.status).toBe(200);
      expect(response.body.name).toBe(updatedClassSession.name);
    });
  
    it('should delete a class session', async () => {
      const response = await request(app)
        .delete(`/api/class-session/${classSessionId}`)
        .set('Authorization', `Bearer ${token}`);;
  
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Class Session deleted successfully');
    });
  });

 
});
