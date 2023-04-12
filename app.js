// app.js

const express = require('express');
const app = express();
const contactRouter = require('./routes/contactRoutes');
// Require the db.js file to establish MongoDB connection
require('./db');


// Middleware for parsing JSON request bodies
app.use(express.json());

// Mounting the contact router
app.use('/contacts', contactRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
