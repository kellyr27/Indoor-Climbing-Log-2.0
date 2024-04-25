const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Ascent = require('../models/ascentModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/database');
const ascentController = require('../controllers/ascentControllers');
const authenticate = require('../middleware/authenticate');
 
router.route('/')
    .post(authenticate, ascentController.createAscent)
    .get(authenticate, ascentController.getAllAscents);

router.route('/:id')
    .get(authenticate, ascentController.getAscentById)
    .put(authenticate, ascentController.updateAscent)
    .delete(authenticate, ascentController.deleteAscent);

module.exports = router;