import mongoose from 'mongoose';

// MongoDB connection open event middleware
const dbConnectionMiddleware = () => {
  mongoose.connection.on('open', () => {
    console.log('MongoDB connection is open');

    // Mongoose plugin to add the updatedAt field automatically before saving
    mongoose.plugin((schema) => {
      schema.pre('save', function (next) {
        this.updatedAt = new Date();
        next();
      });
    });
  });
};

export default dbConnectionMiddleware;
