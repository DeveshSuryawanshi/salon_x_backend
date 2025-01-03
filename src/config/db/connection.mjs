import mongoose from 'mongoose';
import config from '../config.mjs';
import dbConnectionMiddleware from '../../middlewares/dbConnection.middleware.mjs';

const mongoURI = config.mongoDB.uri;

// Configure Mongoose options for a secure and optimized connection
const mongooseOptions = {
  maxPoolSize: 50, // Set the maximum number of connections in the pool
  minPoolSize: 5, // Set the minimum number of connections in the pool
  connectTimeoutMS: 10000, // Time to wait before timing out a connection
  serverSelectionTimeoutMS: 5000, // Time to wait for server selection
  socketTimeoutMS: 45000, // Close sockets after this time
  tls: true, // Use TLS/SSL for connection
};

const connectToMongoDB = async () => {
    // Call the middleware to handle connection events
    dbConnectionMiddleware();
    // Connection events for logging and debugging
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to the database');
    });

    mongoose.connection.on('error', (err) => {
      console.error(`Mongoose connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected from the database');
    });

    // Close connection on app termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('Mongoose connection closed due to application termination');
      process.exit(0);
    });
    
    try {
        // Connect to MongoDB with the URI and options
        await mongoose.connect(mongoURI, mongooseOptions);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the application if the connection fails
    }
};

export default connectToMongoDB;
