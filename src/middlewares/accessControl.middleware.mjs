import cors from 'cors';
import config from '../config/config.mjs';

// Static CORS options
const staticCorsOptions = {
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Include credentials in requests
};

// Dynamic CORS configuration
const allowedOrigins = [config.cors.origin, 'http://another.com'];

const accessControl = (req, res, next) => {
  const origin = req.header('Origin');

  // Dynamic options based on origin
  const dynamicCorsOptions = {
    origin: allowedOrigins.includes(origin) ? origin : false, // Enable/disable CORS for origin
  };

  // Combine static and dynamic options
  const combinedOptions = { ...staticCorsOptions, ...dynamicCorsOptions };

  // Use the `cors` library with the combined options
  cors(combinedOptions)(req, res, next);
};

export default accessControl;
