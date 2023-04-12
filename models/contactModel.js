// models/contactModel.js

const mongoose = require('mongoose');

// Define Contact Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String
  },
  address: {
    type: String
  },
  image: {
    type: String
  }
});

// Create Contact Model
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
