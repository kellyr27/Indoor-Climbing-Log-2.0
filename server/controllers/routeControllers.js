const Ascent = require('../models/ascentModel');
const Route = require('../models/routeModel');

exports.getAllRoutes = async (req, res) => {
    try {
        const routes = const routes = await Route.find().populate('ascents');
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}