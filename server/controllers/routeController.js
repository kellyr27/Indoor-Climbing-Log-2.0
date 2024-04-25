const Ascent = require('../models/ascentModel');
const Route = require('../models/routeModel');
const db = require('../config/database');

exports.getAllRoutes = async (req, res) => {
    try {
        const routes = await Route.find().populate('ascents');
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
        res.status(200).json(route);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateRoute = async (req, res) => {
    //TODO
}

exports.getAscentsByRouteId = async (req, res) => {
    try {
        const ascents = await Ascent.find({ route: req.params.routeId });
        res.status(200).json(ascents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}