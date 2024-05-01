const mongoose = require('mongoose');


const connectDB1 = mongoose.createConnection(process.env.MONGODB_URI_CLIMBINGLOG);
connectDB1.on('error', console.error.bind(console, 'First DB connection error:'));
connectDB1.once('open', () => {
    console.log('Connected to first MongoDB database');
});

module.exports = { connectDB1};