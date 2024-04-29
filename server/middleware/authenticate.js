const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/userModel');
const CustomError = require('../utils/CustomError');

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        req.user = await User.findById(decoded._id);

        if (!req.user) {
            throw new CustomError('Authentication failed', 401);
        }

        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            next(new CustomError('Authentication failed', 401));
        } else {
            next(error);
        }
    }
}

module.exports = authenticate;