import Ascent from '../models/ascentModel'

exports.findAscent = async (ascentId, userId) => {
    const ascent = await Ascent.findById(ascentId);
    if (!ascent) {
        throw new Error('No ascent found with this id');
    }
    if (ascent.user.toString() !== userId.toString()) {
        throw new Error('You do not have permission to access this ascent');
    }
    return ascent;
}

exports.updateAscent = (ascent, newData) => {
    ascent.user = newData.user;
    ascent.route = newData.route;
    ascent.date = newData.date;
    ascent.tickType = newData.tickType;
    ascent.notes = newData.notes;
    return ascent;
}