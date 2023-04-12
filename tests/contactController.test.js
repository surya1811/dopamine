// contactController.test.js

const request = require('supertest');
const app = require('../app'); // Assuming your app file is named app.js
const Contact = require('../models/contactModel'); // Assuming you have a Contact model defined
const { connect, closeDatabase, clearDatabase } = require('../utils/dbTestUtil'); // Assuming you have test utility functions for connecting, closing, and clearing the database

// Connect to test database before running the tests
beforeAll(async () => {
  await connect();
});

// Close the test database connection after running the tests
afterAll(async () => {
  await closeDatabase();
});

// Clear the test database before each test
beforeEach(async () => {
  await clearDatabase();
});

// Test cases for contactController
describe('contactController', () => {
  // Test case for creating a new contact
  it('should create a new contact', async () => {
    const contactData = {
      name: 'John Doe',
      phoneNumbers: ['1234567890'],
      email: 'johndoe@example.com',
    };

    const response = await request(app).post('/contacts').send(contactData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(contactData.name);
    expect(response.body.phoneNumbers).toEqual(contactData.phoneNumbers);
    expect(response.body.email).toBe(contactData.email);
  });

  // Test case for fetching all contacts
  it('should fetch all contacts', async () => {
    // Insert some test data into the database
    const contactData1 = {
      name: 'John Doe',
      phoneNumbers: ['1234567890'],
      email: 'johndoe@example.com',
    };
    await Contact.create(contactData1);

    const contactData2 = {
      name: 'Jane Smith',
      phoneNumbers: ['9876543210'],
      email: 'janesmith@example.com',
    };
    await Contact.create(contactData2);

    const response = await request(app).get('/contacts');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].name).toBe(contactData1.name);
    expect(response.body[1].name).toBe(contactData2.name);
  });

  // Test case for updating a contact
  it('should update a contact', async () => {
    // Insert a test contact into the database
    const contactData = {
      name: 'John Doe',
      phoneNumbers: ['1234567890'],
      email: 'johndoe@example.com',
    };
    const createdContact = await Contact.create(contactData);

    // Update the contact with new data
    const updatedData = {
      name: 'John Smith',
      phoneNumbers: ['9876543210'],
      email: 'johnsmith@example.com',
    };
    const response = await request(app)
      .put(`/contacts/${createdContact._id}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(createdContact._id.toString());
    expect(response.body.name).toBe(updatedData.name);
    expect(response.body.phoneNumbers).toEqual(updatedData.phoneNumbers);
    expect(response.body.email).toBe(updatedData.email);
  });

  // Test case for deleting a contact
  it('should delete a contact', async () => {
    // Insert a test contact into the database
    const contactData = {
      name: 'John Doe',
        phoneNumbers: ['1234567890'],
        email: 'johndoe@example.com',
      };
      const createdContact = await Contact.create(contactData);
  
      // Delete the contact
      const response = await request(app).delete(`/contacts/${createdContact._id}`);
  
      expect(response.status).toBe(204);
  
      // Check if the contact is deleted from the database
      const deletedContact = await Contact.findById(createdContact._id);
      expect(deletedContact).toBeNull();
    });
  });
  
  