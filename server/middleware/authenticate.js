const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/userModel');

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        req.user = await User.findById(decoded.userId);

        if (!req.user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
}

module.exports = authenticate;