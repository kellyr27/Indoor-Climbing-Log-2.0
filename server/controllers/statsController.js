const Ascent = require('../models/ascentModel');
const Route = require('../models/routeModel');
const {findAscent} = require('../services/ascentServices');

exports.getGradePyramid = [
    async (req, res, next) => {
        try {
            // Get all routes for the user and their ascents
            const routes = await Route.find({ user: req.user._id }).populate('ascents')

            // Define the sort order for each tickType
            const sortOrder = {
                'flash': 1,
                'redpoint': 2,
                'hangdog': 3,
                'attempt': 4
            };

            // For each route, sort the ascents by tickType
            routes.forEach(route => {
                route.ascents.sort((a, b) => sortOrder[a.tickType] - sortOrder[b.tickType]);
            });

            const gradePyramid = {}
            routes.forEach(route => {
                if (!gradePyramid[route.grade]) {
                    gradePyramid[route.grade] = {
                        'flash': 0,
                        'redpoint': 0,
                        'hangdog': 0,
                        'attempt': 0
                    }
                }
                gradePyramid[route.grade][route.ascents[0].tickType] += 1;
            })
            res.status(200).json(gradePyramid);
        } catch (error) {
            next(error)
        }
    }
]
