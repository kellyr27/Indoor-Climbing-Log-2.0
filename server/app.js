const express = require('express');
const app = express();
const morgan = require('morgan');
const setUpClimbingLogApp = require('./app2');

const setupApp = () => {

    app.use(express.json());
    app.use(morgan('tiny'));

    // Set up my project apps
    setUpClimbingLogApp(app)

    return app
}

module.exports = setupApp;