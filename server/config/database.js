const mongoose = require('mongoose');

// Define the connection URL
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI).then(() => {
    console.log('Successfully connected to MongoDB');
}).catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
});

// Access the default connection and bind error event
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;