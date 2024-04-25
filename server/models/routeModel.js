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
    }
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;