const mongoose = require('mongoose');
const { logger } = require('./logger');

async function connectMongo(uri) {
  if (!uri) {
    logger.warn('MONGODB_URI not set; skipping MongoDB connection');
    return;
  }
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 7000,
    });
    logger.info('MongoDB connected');
  } catch (err) {
    logger.error('MongoDB connection error', { message: err.message });
    process.exitCode = 1;
  }
}

module.exports = { connectMongo };
