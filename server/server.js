const setupApp = require('./app');

const startServer = async () => {
    try {

        // Set up the app
        const app = setupApp();

        const PORT = process.env.PORT || 5000;
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        return server
    } catch (error) {
        console.error('Could not start server', error);
        process.exit(1);
    }
};

if (process.env.NODE_ENV !== 'test') {
    console.log("NOT TESTTTDTTT")
    startServer();
}

module.exports = startServer;