const Ascent = require('../models/ascentModel');
const Route = require('../models/routeModel');
const ascentSchema = require('../validators/ascentValidator')
const validateSchema = require('../middleware/validateSchema')
const { findAscent, updateAscentData } = require('../services/ascentServices')
const { findOrCreateRoute } = require('../services/routeServices')


exports.createAscent = [
    validateSchema(ascentSchema),
    async (req, res, next) => {
        try {

            // Check if the route already exists in the database
            console.log('Passed validateSchema')
            let route = await findOrCreateRoute(req.body.route, req.user._id);

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
            next(error)
        }
    }
]

exports.getAllAscents = [
    async (req, res, next) => {
        try {
            const ascents = await Ascent.find({ user: req.user._id }).populate('route');
            res.status(200).json(ascents);
        } catch (error) {
            next(error)
        }
    }
]

exports.getAscentById = [
    async (req, res, next) => {
        try {
            const ascent = await findAscent(req.params.id, req.user._id);
            res.status(200).json(ascent);
        } catch (error) {
            next(error)
        }
    }
]

exports.updateAscent = [
    validateSchema(ascentSchema),
    async (req, res, next) => {
        try {

            const ascent = await findAscent(req.params.id, req.user._id);

            // Check if the route already exists in the database
            const route = await findOrCreateRoute(req.body.route, req.user._id)

            const newData = {
                user: req.user._id,
                route: route._id,
                date: req.body.date,
                tickType: req.body.tickType,
                notes: req.body.notes
            };
            const updatedAscent = updateAscentData(ascent, newData);
            await updatedAscent.save();

            res.status(200).json(ascent);
        } catch (error) {
            next(error)
        }
    }
]

exports.deleteAscent = [async (req, res, next) => {
    try {
        const ascent = await findAscent(req.params.id, req.user._id);

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

        res.status(200).json({ message: 'Ascent deleted successfully' });
    } catch (error) {
        next(error)
    }
}]