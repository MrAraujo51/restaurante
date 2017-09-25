const passport  = require('passport');
const user  = require('./user.server.controller');

module.exports = (app) => {
    // API Server Endpoints

    /**
     * Route to register new user
     */

    app.post('/api/user/register', user.saveUser);

    /**
     * Route to check if user's email is available for registration
     * 
     * @param email
     */
    app.get('/api/user/checkEmail/:email', user.checkEmail);

    /**
     * Route for update a specific user
     * 
     * @param userId
     */
    app.put('/api/user/update/:userId', user.updateUser)

    /**
     * Route for authentication user
     */
    app.post('/api/user/authenticate', user.authenticate);
}
