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
                // Check that their exists an ascent for the route
                if (route.ascents.length === 0) {
                    return;
                }

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
            console.log('4')
            res.status(200).json(gradePyramid);
        } catch (error) {
            next(error)
        }
    }
]

exports.getPerformanceRating = [
    async (req, res, next) => {
        try {

            const POINTS_TICKTYPE = {
                'flash': 5, 
                'redpoint': 4,
                'hangdog': 3,
                'attempt': 1
            }
            
            /**
             * Low - 1 send
             * Medium - 2-4 sends
             * High - 5+ sends
             */
            const POINTS_SCARCITY = {
                'Low': 2,
                'Medium': 1,
                'High': 0
            }

            //TODO: Add points for more climbs in a session

            // Get all routes for the user and their ascents
            const routes = await Route.find({ user: req.user._id }).populate('ascents')

            // For each route, sort the ascents by date
            routes.forEach(route => {
                route.ascents.sort((a, b) => new Date(a.date) - new Date(b.date));
            });

            // For each route, assign points scarcity to the ascent object
            routes.forEach(route => {
                let count = 0;
                route.ascents = route.ascents.map(ascent => {
                    if (ascent.tickType === 'redpoint' || ascent.tickType === 'flash') {
                        count++;
                    }
                    return { 
                        date: ascent.date, 
                        grade: route.grade,
                        tickType: ascent.tickType,
                        pointsScarcity: count < 2 ? 'Low' : count < 5 ? 'Medium' : 'High'
                    };
                });
            });

            // Extract all the ascents into a single array
            const allAscents = routes.flatMap(route => route.ascents);

            const performanceRatings = {}
            allAscents.forEach(ascent => {
                // Convert the date to a string 'YYYY-MM-DD'
                const date = new Date(ascent.date).toISOString().split('T')[0];
                
                // Points calculation
                const points = ascent.grade + POINTS_TICKTYPE[ascent.tickType] + POINTS_SCARCITY[ascent.pointsScarcity];
                
                if (!performanceRatings[date]) {
                    performanceRatings[date] = [points];
                } else {
                    performanceRatings[date].push(points);
                }
            })

            const performanceRatingsFormatted = Object.entries(performanceRatings).reduce((formatted, [key, value]) => {
                const newValue = {
                    numClimbs: value.length,
                    totalPoints: Number((value.reduce((acc, curr) => acc + curr, 0) / value.length).toFixed(2)),
                }
            
                // Add the new key/value pair to the formatted object
                formatted[key] = newValue;
            
                return formatted;
            }, {});

            console.log(performanceRatingsFormatted)

            res.status(200).json(performanceRatingsFormatted);

        } catch (error) {
            next(error)
        }
    }
]

