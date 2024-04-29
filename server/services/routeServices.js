const Ascent = require('../models/ascentModel');
const Route = require('../models/routeModel');
import CustomError from '../utils/CustomError';
const validateSchema = require('../middleware/validateSchema')


exports.findOrCreateRoute = async (routeData) => {
    let route = await Route.findOne({ name: routeData.name });
    if (!route) {
        route = new Route(routeData);
        await route.save();
    }
    return route;
}

exports.findRoute = async (routeId, userId) => {
    const route = await Route.findById(routeId);
    if (!route) {
        throw new CustomError('No route found with this id', 404);
    }
    if (route.user.toString() !== userId.toString()) {
        throw new CustomError('You do not have permission to access this route', 403);
    }
    return ascent;
}

exports.updateRoute = (route, newData) => {
    route.name = newData.name;
    route.colour = newData.colour;
    route.grade = newData.grade;
    route.user = newData.user;
    return route;
}