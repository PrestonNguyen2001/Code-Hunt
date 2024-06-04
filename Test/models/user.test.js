const { User } = require('../../models'); // Import the User model
const bcrypt = require('bcryptjs');

describe('User Model', () => {
  beforeAll(async () => {
    await User.sync({ force: true });
  });

  beforeEach(async () => {
    await User.destroy({ where: { username: 'testuser' } });
  });

  // Test the checkPassword method
  describe('checkPassword', () => {
    let user;

    beforeEach(async () => {
      const userData = {
        username: 'testuser',
        email: 'test@testmail.com',
        password: 'password123',
      };
     user = await User.create(userData);
    });
   
    it('should return true if the password is correct', async () => {
      const isCorrectPassword = await user.checkPassword('password123')
      expect(isCorrectPassword).toBe(true);
    });
    
    it('should return false if the password is incorrect', async () => { 
      const isCorrectPassword = await user.checkPassword('wrongpassword');
      expect(isCorrectPassword).toBe(false);
    });
  });

  // Test the beforeCreate hook 
  describe('beforeCreate hook', () => {
    let user;

    beforeEach(async () => {
      const userData = {
        username: 'testuser',
        email: 'test@testmail.com',
        password: 'password123',
      };
     user = await User.build(userData);
    });

    it('should hash the password before creating a new user', async () => {
     //Saving user should rigger the hook.
      await user.save()
      expect(user.password).not.toEqual('password123'); 
    });
  });

  // Test the beforeUpdate hook
  describe('beforeUpdate hook', () => {
    let user;

    beforeEach(async () => {
      const userData = {
        username: 'testuser',
        email: 'test@testmail.com',
        password: 'password123',
      };
     user = await User.create(userData);
    });

    it('should hash the password before updating an existing user', async () => {
      //Finding, updating password, then saving password.
      const user = await User.findOne({ where: { username: 'testuser' } }); 
      user.password = 'newpassword123';
      await user.save();
      
      expect(user.password).not.toEqual('newpassword123'); 
    });
  });
});
