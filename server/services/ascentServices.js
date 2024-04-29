const Ascent = require('../models/ascentModel');
const CustomError = require('../utils/CustomError');

exports.findAscent = async (ascentId, userId) => {
    const ascent = await Ascent.findById(ascentId);
    if (!ascent) {
        throw new CustomError('No ascent found with this id', 404);
    }
    if (ascent.user.toString() !== userId.toString()) {
        throw new CustomError('You do not have permission to access this ascent', 403);
    }
    return ascent;
}

exports.updateAscentData = (ascent, newData) => {
    ascent.user = newData.user;
    ascent.route = newData.route;
    ascent.date = newData.date;
    ascent.tickType = newData.tickType;
    ascent.notes = newData.notes;
    return ascent;
}