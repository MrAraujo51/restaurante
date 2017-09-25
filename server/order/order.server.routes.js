const passport  = require('passport');
const order  = require('./order.server.controller');

module.exports = (app) => {
    // API Server Endpoints
    app.post('/api/order/register',  passport.authenticate('jwt', {session: false}) , order.register);

    app.get('/api/order/:orderId', user.getOrder);

    app.get('/api/orders', user.getAllOrders)

    app.put('/api/order/update/:orderId',  passport.authenticate('jwt', {session: false}), user.updateUser)
}