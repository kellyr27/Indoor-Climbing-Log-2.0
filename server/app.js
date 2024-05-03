const express = require('express');
const app = express();
const morgan = require('morgan');
const setUpClimbingLogApp = require('./app2');

// TODO: Stop long error messages from printing to console
const setupApp = () => {

    const allowedOrigins = [
        // For the climbingLog App
        'https://indoor-climbing-log.onrender.com',
        'http://localhost:3000',
        'https://climbinglog.com.au',
        'https://www.climbinglog.com.au',,
      ];
    
    // Set middleware of CORS 
    app.use((req, res, next) => {
    
        const origin = req.headers.origin;
        if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
    
        res.setHeader(
          "Access-Control-Allow-Methods",
          "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
        );
        res.setHeader(
          "Access-Control-Allow-Headers",
          "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
        );
        res.setHeader("Access-Control-Allow-Credentials", true);
        res.setHeader("Access-Control-Allow-Private-Network", true);
        //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
        res.setHeader("Access-Control-Max-Age", 7200);
      
        next();
    });

	// TODO: Move error handler middleware to OmegaServer level middleware
	const errorHandler = require('./middleware/errorHandler');
	app.use(errorHandler);

    app.use(express.json());
    app.use(morgan('tiny'));

    // Set up my project apps
    setUpClimbingLogApp(app)

    return app
}

module.exports = setupApp;