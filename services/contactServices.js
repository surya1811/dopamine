// services/contactService.js

const Contact = require('../models/contactModel');

// Service function to create a new contact
const createContact = async (contactData) => {
  try {
    const { name, phoneNumber, email, address, image } = contactData;

    // Check if contact with the same phone number already exists
    const existingContact = await Contact.findOne({ phoneNumber });
    if (existingContact) {
      throw new Error('Contact with the same phone number already exists');
    }

    // Create a new contact
    const contact = new Contact({ name, phoneNumber, email, address, image });
    await contact.save();

    return contact;
  } catch (err) {
    throw new Error('Failed to create contact');
  }
};

// Service function to fetch all contacts
const fetchAllContacts = async () => {
  try {
    // Fetch all contacts from the database
    const contacts = await Contact.find();

    return contacts;
  } catch (err) {
    throw new Error('Failed to fetch contacts');
  }
};

// Service function to fetch a single contact by ID
const fetchContactById = async (id) => {
  try {
    // Fetch contact by ID from the database
    const contact = await Contact.findById(id);

    if (!contact) {
      throw new Error('Contact not found');
    }

    return contact;
  } catch (err) {
    throw new Error('Failed to fetch contact');
  }
};

// Service function to update a contact by ID
const updateContactById = async (id, contactData) => {
  try {
    const { name, phoneNumber, email, address, image } = contactData;

    // Fetch contact by ID from the database
    const contact = await Contact.findById(id);

    if (!contact) {
      throw new Error('Contact not found');
    }

    // Update contact fields
    contact.name = name;
    contact.phoneNumber = phoneNumber;
    contact.email = email;
    contact.address = address;
    contact.image = image;
    await contact.save();

    return contact;
  } catch (err) {
    throw new Error('Failed to update contact');
  }
};

// Service function to delete a contact by ID
const deleteContactById = async (id) => {
  try {
    // Fetch contact by ID from the database
    const contact = await Contact.findById(id);

    if (!contact) {
      throw new Error('Contact not found');
    }

    // Delete contact from the database
    await contact.remove();
  } catch (err) {
    throw new Error('Failed to delete contact');
  }
};

module.exports = {
  createContact,
  fetchAllContacts,
  fetchContactById,
  updateContactById,
  deleteContactById
};
