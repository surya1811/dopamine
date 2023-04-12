const mongoose = require('mongoose');

// Replace the following connection string with your own MongoDB connection string
const MONGODB_URI = 'mongodb://localhost:27017/dopamine';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Listen for MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Failed to connect to MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Export the Mongoose instance for use in other parts of the application
module.exports = mongoose;
