import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import routes from './routes/index.mjs';  // Importing routes with ES6 syntax
import errorMiddleware from './middlewares/error.middleware.mjs';  // Importing custom middleware

const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(helmet()); // Secure HTTP headers
app.use(morgan('combined')); // Log HTTP requests
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests

// Routes
app.use('/api/v1', routes); // Mount the API routes under `/api/v1`

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Global error handling middleware
app.use(errorMiddleware);

export default app;  // Use ES module export
