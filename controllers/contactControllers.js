// controllers/contactController.js

const Contact = require('../models/contactModel');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const papaparse = require('papaparse');
const fs = require('fs');
const mongoose = require('mongoose')

// ...

// Controller function to create a new contact
const createContact = async (req, res) => {
  try {
    const { name, phoneNumber, email, address, image } = req.body;

    // Check if contact with the same phone number already exists
    const existingContact = await Contact.findOne({ phoneNumber });
    if (existingContact) {
      return res.status(409).json({ error: 'Contact with the same phone number already exists' });
    }

    // Create a new contact
    const contact = new Contact({ name, phoneNumber, email, address, image });
    await contact.save();

    res.status(201).json({ message: 'Contact created successfully', contact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create contact' });
  }
};

// Controller function to fetch all contacts
const fetchAllContacts = async (req, res) => {
  try {
    // Fetch all contacts from the database
    const contacts = await Contact.find();

    res.status(200).json({ contacts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};

// Controller function to fetch a single contact by ID
// Controller function to fetch a contact by ID
const fetchContactById = async (req, res) => {
    try {
      const contactId = req.params.id;
      console.log(contactId)
      // Convert the contactId to an ObjectId
      const contact = await Contact.findById(contactId);
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }
      res.status(200).json({ contact });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch contact' });
    }
  };
  

// Controller function to update a contact by ID
const updateContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phoneNumber, email, address, image } = req.body;

    // Fetch contact by ID from the database
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    // Update contact fields
    contact.name = name;
    contact.phoneNumber = phoneNumber;
    contact.email = email;
    contact.address = address;
    contact.image = image;
    await contact.save();

    res.status(200).json({ message: 'Contact updated successfully', contact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update contact' });
  }
};

// Controller function to delete a contact by ID
const deleteContactById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find and delete contact by ID using findOneAndDelete
      const contact = await Contact.findOneAndDelete({ _id: id });
  
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }
  
      res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete contact' });
    }
  };
  
 
// controllers/contactController.js



// Controller function to generate a CSV report for all contacts
const generateCsvReport = async (req, res) => {
  try {
    // Fetch all contacts from the database
    const contacts = await Contact.find();

    // Create a CSV writer to write contacts data to CSV file
    const csvWriter = createCsvWriter({
      path: 'contacts.csv',
      header: [
        { id: 'name', title: 'Name' },
        { id: 'phoneNumber', title: 'Phone Number' },
        { id: 'email', title: 'Email' },
        { id: 'address', title: 'Address' },
        { id: 'image', title: 'Image' }
      ]
    });

    // Write contacts data to CSV file
    csvWriter.writeRecords(contacts)
      .then(() => {
        console.log('CSV report generated successfully');
        // Read the generated CSV file and send it as response
        const file = fs.createReadStream('contacts.csv');
        file.pipe(res);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Failed to generate CSV report' });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate CSV report' });
  }
};






// Call the function to generate CSV report

  
  module.exports = {
    createContact,
    fetchAllContacts,
    fetchContactById,
    updateContactById,
    deleteContactById,
    generateCsvReport
  };
  