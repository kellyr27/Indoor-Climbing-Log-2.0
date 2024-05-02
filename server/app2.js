// To be renamed - app.js but in a subfolder

const basePath = '/climbinglog';

const setUpClimbingLogApp = (app) => {

    const authenticate = require('./middleware/authenticate');
    // const errorHandler = require('./middleware/errorHandler');

    // Routes
    const userRoutes = require('./routes/userRoutes');
    const ascentRoutes = require('./routes/ascentRoutes');
    const routeRoutes = require('./routes/routeRoutes');

    app.use(`${basePath}/api/users`, userRoutes);
    app.use(`${basePath}/api/ascents`, ascentRoutes);
    app.use(`${basePath}/api/routes`, routeRoutes);

    // Used for testing the authenticate middleware
    app.get(`${basePath}/api/protected`, authenticate, (req, res) => {
        res.status(200).json({ message: 'You are authenticated' });
    });

    return app
}

module.exports = setUpClimbingLogApp;