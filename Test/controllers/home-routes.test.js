const request = require('supertest');
const app = require('../../app'); 
const withAuth = require('../../public/utils/auth');

describe('Home Routes', () => {
  beforeEach(() => {
    // Apply the withAuth middleware to all routes
    app.use(withAuth);
    // Simulate authentication
    app.use((req, res, next) => {
      console.log("Simulating authentication...");
      req.session = { user_id: 1 }; 
      next();
    });
  });
//Testing
/*describe('GET /', ()  => {
  it('Should return the homepage with problems', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toContain('text/html');
  });
});

describe('GET /problems/:id', () => {
  it('should return a signle problem by Id', async () => {
   
    const res = await request(app).get('/problems/1');

    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Two Sum');
    expect(res.headers['content-type']).toContain('text/html');
  });

  it('should respond with status 404 for an invalid problem id', async () => {
    
    const res = await request(app).get('/problems/999');
    
    expect(res.statusCode).toEqual(404);
  });
  });*/
  describe('GET /problems/:id without authentication', () => {
    it('should redirect to login for an unauthenticated user', async () => {
      const res = await request(app).get('/problems/1');
      
      expect(res.statusCode).toEqual(302);
      expect(res.headers.location).toEqual('/login');
    });
});
});