const Ascent = require('../models/ascentModel');
const Route = require('../models/routeModel');

exports.createAscent = async (req, res) => {
    try {
        // Check if the route already exists in the database
        let route = await Route.findOne({ name: req.body.route.name });
        if (!route) {
            route = new Route(req.body.route);
            await route.save();
        }

        const ascent = new Ascent({
            user: req.body.user,
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
        const ascents = await Ascent.find().populate('route');
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
        res.status(200).json(ascent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateAscent = async (req, res) => {

}

exports.deleteAscent = async (req, res) => {
    try {
        const ascent = await Ascent.findByIdAndDelete(req.params.id);
        if (!ascent) {
            return res.status(404).json({ message: 'No ascent found with this id' });
        }
        res.status(200).json({ message: 'Ascent deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}