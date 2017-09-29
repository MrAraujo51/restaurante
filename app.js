const express       = require('express');
const path          = require('path');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const passport      = require('passport');


require('./server/config/passport')(passport);

const app = express();

// CORS Middleware
app.use(cors({
    // origin: 'https://restaurant.herokuapp.com/'
}));

// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

/** load routes*/
require('./server/user/user.server.routes')(app);
require('./server/order/order.server.routes')(app);
// require('./server/product/product.server.routes')(app);
// require('./server/instance/instance.server.routes')(app);
// require('./server/instanceUser/instanceUser.server.routes')(app);
// require('./server/client/client.server.routes')(app);

// Index route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
})

app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname, 'public/index.html'))
})

/** Start server */
module.exports = app