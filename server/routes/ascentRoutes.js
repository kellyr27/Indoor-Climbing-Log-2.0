const express = require('express');
const router = express.Router();
const ascentController = require('../controllers/ascentController');
const authenticate = require('../middleware/authenticate');

 
router.route('/')
    .post(authenticate, ...ascentController.createAscent)
    .get(authenticate, ...ascentController.getAllAscents);


const getAscentsObjects = require('../uploadDb/uploadDb');
const Ascent = require('../models/ascentModel');
const { findOrCreateRoute } = require('../services/routeServices');
router.route('/upload')
    .get(authenticate, 
        async (req, res) => {
            const ascentObjects = await getAscentsObjects();
            console.log(ascentObjects)
            
            for (const ascentObject of ascentObjects) {
                let route = await findOrCreateRoute(ascentObject.route, req.user._id);

                const ascent = new Ascent({
                    user: req.user._id,
                    route: route._id,
                    date: ascentObject.date,
                    tickType: ascentObject.tickType,
                    notes: ascentObject.notes
                });

                await ascent.save();
                
            }

            res.status(200).json({ message: 'Uploaded ascents' });
        }
    )

router.route('/:id')
    .get(authenticate, ...ascentController.getAscentById)
    .put(authenticate, ...ascentController.updateAscent)
    .delete(authenticate, ...ascentController.deleteAscent);


module.exports = router;