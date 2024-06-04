const { User } = require('../../models');

async function destroyUser(userModelInstance) {
    try {
        if (!userModelInstance) {
            throw new Error('User model instance is not provided');
        }
        await userModelInstance.destroy();
    } catch (err) {
        console.error(`Error destroying user:`, err)
        throw err;
    }
}

module.exports= { destroyUser };