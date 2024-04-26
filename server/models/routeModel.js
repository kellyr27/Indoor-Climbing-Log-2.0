const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    name: { 
        type: String, 
        unique: true, 
        required: true 
    },
    colour: { 
        type: String, 
        required: true 
    },
    grade: { 
        type: Number, 
        required: true 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

routeSchema.virtual('ascents', {
    ref: 'Ascent',
    localField: '_id',
    foreignField: 'route',
    justOne: false
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;