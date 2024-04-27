const Ascent = require('../models/ascentModel');
const Route = require('../models/routeModel');
// const ascentSchema = require('../validators/ascentValidator')
// const { findAscent, updateAscent } = require('../services/ascentServices')

exports.createAscent = async (req, res) => {
    try {
        // Validate the request body against the schema
        const { error } = ascentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Check if the route already exists in the database
        let route = await Route.findOne({ name: req.body.route.name });
        if (!route) {
            route = new Route(req.body.route);
            await route.save();
        }

        const ascent = new Ascent({
            user: req.user._id,
            route: route._id,
            date: req.body.date,
            tickType: req.body.tickType,
            notes: req.body.notes
        });

        await ascent.save();

        res.status(201).json(ascent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAllAscents = async (req, res) => {
    try {
        const userId = req.user._id;
        const ascents = await Ascent.find({ user: userId }).populate('route');
        res.status(200).json(ascents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAscentById = async (req, res) => {
    try {
        const ascent = await Ascent.findById(req.params.id).populate('route');
        if (!ascent) {
            return res.status(404).json({ message: 'No ascent found with this id' });
        }

        // Check if the ascent belongs to the logged-in user
        if (ascent.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You do not have permission to access this ascent' });
        }

        res.status(200).json(ascent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateAscent = async (req, res) => {
    try {
        // Validate the request body against the schema
        const { error } = ascentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const ascent = await Ascent.findById(req.params.id);
        if (!ascent) {
            return res.status(404).json({ message: 'No ascent found with this id' });
        }

        // Check if the ascent belongs to the logged-in user
        if (ascent.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You do not have permission to update this ascent' });
        }

        // Check if the route already exists in the database
        let route = await Route.findOne({ name: req.body.route.name });
        if (!route) {
            route = new Route(req.body.route);
            await route.save();
        }

        ascent.user = req.user._id;
        ascent.route = route._id;
        ascent.date = req.body.date;
        ascent.tickType = req.body.tickType;
        ascent.notes = req.body.notes;

        await ascent.save();

        res.status(200).json(ascent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteAscent = async (req, res) => {
    try {
        const ascent = await Ascent.findById(req.params.id);
        if (!ascent) {
            return res.status(404).json({ message: 'No ascent found with this id' });
        }

        // Check if the ascent belongs to the logged-in user
        if (ascent.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You do not have permission to delete this ascent' });
        }

        // Store the route id before deleting the ascent
        const routeId = ascent.route;

        // Delete the ascent
        await ascent.remove();

        // Check if there are any other ascents with the same route
        const otherAscents = await Ascent.find({ route: routeId });
        if (otherAscents.length === 0) {
            // If not, delete the route
            await Route.findByIdAndDelete(routeId);
        }

        res.status(200).json({ message: 'Ascent (and possibly associated route) deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}