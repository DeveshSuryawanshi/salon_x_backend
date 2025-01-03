import http from 'http';
import app from './app.mjs';  // Import the app defined in app.mjs
import config from './config/config.mjs';
import connectToMongoDB from './config/db/connection.mjs';
import { Logger } from './config/logger.mjs';

const PORT = config.app.port || 3000;
const server = http.createServer(app);

// Start the server
server.listen(PORT, async() => {
    try {
        await connectToMongoDB();
        Logger.info(`Server is running on http://localhost:${PORT}`);
    } catch (error) {
        Logger.error("Error starting server: ", error);
    }
});

// Handle unhandled rejections or exceptions
process.on('unhandledRejection', (err) => {
  Logger.error('Unhandled rejection:', err);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  Logger.error('Uncaught exception:', err);
  process.exit(1);
});
