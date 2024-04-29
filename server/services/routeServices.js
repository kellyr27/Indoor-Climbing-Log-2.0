import Route from '../models/routeModel.js';

exports.findOrCreateRoute = async (routeData) => {
    let route = await Route.findOne({ name: routeData.name });
    if (!route) {
        route = new Route(routeData);
        await route.save();
    }
    return route;
}