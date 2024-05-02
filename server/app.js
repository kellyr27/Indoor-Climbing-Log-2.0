const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const setUpClimbingLogApp = () => {
    const authenticate = require('./middleware/authenticate');
    const errorHandler = require('./middleware/errorHandler');

    app.use(bodyParser.json());
    app.use(morgan('tiny'));

    // Routes
    const userRoutes = require('./routes/userRoutes');
    const ascentRoutes = require('./routes/ascentRoutes');
    const routeRoutes = require('./routes/routeRoutes');

    app.use('/api/users', userRoutes);
    app.use('/api/ascents', ascentRoutes);
    app.use('/api/routes', routeRoutes);
    app.use(errorHandler);

    // Used for testing the authenticate middleware
    app.get('/protected', authenticate, (req, res) => {
        res.status(200).json({ message: 'You are authenticated' });
    });

    return app
}

module.exports = setUpClimbingLogApp;