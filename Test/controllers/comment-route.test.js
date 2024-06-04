const request = require('supertest');
const app = require('../../app');




describe('Comment Routes', () => {
   
});

//Testing
describe('GET /api/comments/:problem_id', () => {
    it('Should fetch all comments for specific problem_id', async () => {
       
        const res = await request(app).get('/api/comments/1');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body[0]).toHaveProperty('content');
    });
});

/*describe('POST /api/comments', () => {
    it('Should create a new comment', async () => {
        const user = await user.findOne({ 
            where: {user: 'testuser'
         }});

         //mock session for authentication
         app.use((req, res, next) => {
            req.session.user_id = user.id;
            next();
         });

         const commentData = {
            problem_id: 999,
            content: 'This is a test comment'
         };
         const res = (await request(app).post('/comments')).setEncoding(commentData);
         expect(res.statusCode).toEqual(200);
         expect(res.body).toHaveProperty('content', 'This is a test comment')
    });

    it('Should not create a comment witout authenticaton', async () => {
        const commentData = {
            problem_id: 999,
            content: 'This comment should not be created'
        };

        //making session  invalid
        app.use((req, res, next) => {
            req.session.user_id = null;
            next();
        });

        const res = (await request(app).post('/comments')).setEncoding(commentData);
        expect(res.statusCode).toEqual(400);
    });
  });*/
