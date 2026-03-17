/**
 * db.js - MongoDB Connection Configuration
 * 
 * This module establishes the connection to MongoDB using Mongoose.
 * It reads the connection URI from environment variables (.env file).
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Mongoose 7+ no longer needs useNewUrlParser / useUnifiedTopology
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Exit the process with failure code if DB connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
