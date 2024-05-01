const mongoose = require('mongoose');
const {connectDB1} = require('../config/database');

const ascentSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    route: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Route', 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    tickType: { 
        type: String, 
        required: true,
        enum: ['flash', 'redpoint', 'hangdog', 'attempt']
    },
    notes: { 
        type: String, 
        required: false 
    },
});

const Ascent = connectDB1.model('Ascent', ascentSchema);


module.exports = Ascent;