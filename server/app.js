const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./config/database');

app.use(bodyParser.json());
app.use(morgan('tiny'));

// Routes
const userRoutes = require('./routes/userRoutes');
const ascentRoutes = require('./routes/ascentRoutes');
const routeRoutes = require('./routes/routeRoutes');

app.use('/api/users', userRoutes);
app.use('/api/ascents', ascentRoutes);
app.use('/api/routes', routeRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});