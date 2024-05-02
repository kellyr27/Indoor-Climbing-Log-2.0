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
    app.get(`${basePath}/protected`, authenticate, (req, res) => {
        res.status(200).json({ message: 'You are authenticated' });
    });

    // app.get(`${basePath}/upload`, authenticate, async (req, res) => {
    //     const ascentObjects = await getAscentsObjects();
    //     console.log(ascentObjects)
        
    //     for (const ascentObject of ascentObjects) {
    //         let route = await findOrCreateRoute(ascentObject.route, req.user._id);

    //         const ascent = new Ascent({
    //             user: req.user._id,
    //             route: route._id,
    //             date: ascentObject.date,
    //             tickType: ascentObject.tickType,
    //             notes: ascentObject.notes
    //         });

    //         await ascent.save();
            
    //     }

    //     res.status(200).json({ message: 'Upload page' });
    // })

    return app
}

module.exports = setUpClimbingLogApp;