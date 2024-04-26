const Ascent = require('../models/ascentModel');
const Route = require('../models/routeModel');
const routeSchema = require('../validators/routeValidator');

exports.getAllRoutes = async (req, res) => {
    try {
        const userId = req.user._id;
        const routes = await Route.find({ user: userId }).populate('ascents');
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getRouteById = async (req, res) => {
    try {
        const route = await Route.findById(req.params.id).populate('ascents');
        if (!route) {
            return res.status(404).json({ message: 'No route found with this id' });
        }

        // Check if the route belongs to the logged-in user
        if (route.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You do not have permission to access this route' });
        }

        res.status(200).json(route);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateRoute = async (req, res) => {
    try {
        // Validate the request body against the schema
        const { error } = routeSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const route = await Route.findById(req.params.id);
        if (!route) {
            return res.status(404).json({ message: 'No route found with this id' });
        }

        // Check if the route belongs to the logged-in user
        if (route.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You do not have permission to update this route' });
        }

        // Update the route
        route.name = req.body.name;
        route.grade = req.body.grade;
        route.type = req.body.type;
        route.location = req.body.location;

        await route.save();

        res.status(200).json(route);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAscentsByRouteId = async (req, res) => {
    try {
        const route = await Route.findById(req.params.routeId);
        if (!route) {
            return res.status(404).json({ message: 'No route found with this id' });
        }

        // Check if the route belongs to the logged-in user
        if (route.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You do not have permission to access the ascents of this route' });
        }

        const ascents = await Ascent.find({ route: req.params.routeId });
        res.status(200).json(ascents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};