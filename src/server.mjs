import dotenv from 'dotenv';
import http from 'http';
import app from './app.mjs';  // Import the app defined in app.mjs
import config from './config/config.mjs';

const PORT = config.app.port || 3000;
const server = http.createServer(app);

// Start the server
server.listen(PORT, async() => {
    try {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log("Database connection established");
    } catch (error) {
        console.log("Error starting server: ", error);
    }
});

// Handle unhandled rejections or exceptions
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});
