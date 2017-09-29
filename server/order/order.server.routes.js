const passport  = require('passport');
const order  = require('./order.server.controller');

module.exports = (app) => {
    // API Server Endpoints
    app.post('/api/order/register',  passport.authenticate('jwt', {session: false}) , order.register);

    // app.get('/api/order/:orderId', order.getOrder);

    app.get('/api/orders', order.getAllOrders);

    app.get('/api/orders/pending', order.getAllPendingOrders);

    app.get('/api/orders/in-process', order.getAllInProcessOrders);

    app.get('/api/orders/done', order.getAllDoneOrders);
    
    app.post('/api/orders/is-in-process', passport.authenticate('jwt', {session: false}), order.isInProcess);
    
    app.post('/api/orders/is-done', passport.authenticate('jwt', {session: false}), order.isDone);
    

    // app.put('/api/order/update/:orderId',  passport.authenticate('jwt', {session: false}), user.updateUser)
}