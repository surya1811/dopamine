// dbTestUtil.js
const mongoose = require('mongoose');
const config = require('../config'); // Assuming you have a config file for database configuration

// Utility function to connect to the test database
async function connect() {
  await mongoose.connect(config.testDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// Utility function to close the test database connection
async function closeDatabase() {
  await mongoose.connection.close();
}

// Utility function to clear the test database
async function clearDatabase() {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
}

module.exports = {
  connect,
  closeDatabase,
  clearDatabase,
};
