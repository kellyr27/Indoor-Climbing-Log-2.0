const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const db = require('./config/database');

app.use(bodyParser.json());

// Routes
const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});