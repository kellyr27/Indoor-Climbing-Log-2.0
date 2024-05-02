const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const authenticate = require('../middleware/authenticate');

 
router.route('/grade-pyramid')
    .get(authenticate, ...statsController.getGradePyramid);

module.exports = router;

