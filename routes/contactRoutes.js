// routes/contactRouter.js

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactControllers');

// Route for creating a new contact
router.post('/', contactController.createContact);

// Route for fetching all contacts
router.get('/', contactController.fetchAllContacts);

// Route for fetching a single contact by ID
router.get('/:id', contactController.fetchContactById);

// Route for updating a contact by ID
router.put('/:id', contactController.updateContactById);

// Route for deleting a contact by ID
router.delete('/:id', contactController.deleteContactById);


// Route for exporting all contacts to CSV
router.get('/csv', contactController.generateCsvReport);

module.exports = router;
