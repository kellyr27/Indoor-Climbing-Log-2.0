const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connectDB = require('./config/database');


app.use(bodyParser.json());
app.use(morgan('tiny'));

// Routes
const userRoutes = require('./routes/userRoutes');
const ascentRoutes = require('./routes/ascentRoutes');
const routeRoutes = require('./routes/routeRoutes');

app.use('/api/users', userRoutes);
app.use('/api/ascents', ascentRoutes);
app.use('/api/routes', routeRoutes);

const authenticate = require('./middleware/authenticate');


// Used for testing the authenticate middleware
app.get('/protected', authenticate, (req, res) => {
    res.status(200).json({ message: 'You are authenticated' });
});

connectDB();

// Start server
// NOTE: Should always be at the end of the file after all routes are defined
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

module.exports = app;