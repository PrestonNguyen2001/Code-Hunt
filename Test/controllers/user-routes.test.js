
const request = require('supertest');
const app = require('../../app'); 
const { destroyUser } = require('../helpers/testUtils');
const { User } = require('../../models');

describe('User Routes', () => {
  beforeEach(async () => {
  // Delete the user before each test case
  const user = await User.findOne({ where: { username: 'testuser' } });
  if (user) {
    await destroyUser(user);
  }
}); 
//Test to get all users
  test('GET /api/users should return all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
//Test to create new user
  test('POST /api/users should create a new user', async () => {
    const newUser = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    };

    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe(newUser.username);
    
  });

  test('Should fail if missing email value', async () => {
    const res = await request(app)
    .post('/api/users')
    .send({
        username: 'testuser',
        password: 'password123'
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Email, username, and password are required.')
});
  it('Should fail if missing username value', async () => {
    const res = await request(app)
   .post('/api/users')
   .send({
      email: 'test@testmail.com',
      password: 'password123'
  });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Email, username, and password are required.');
});

  it('Should fail is missing password value', async () => {
    const res = await request(app)
    .post('/api/users')
    .send({
      email: 'test@testmail.com',
      username: 'testuser',
  });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Email, username, and password are required.');
})
});

