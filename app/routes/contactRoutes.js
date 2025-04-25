const express = require('express');
const router = express.Router();

// Import controller functions
const {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
} = require('../controllers/contactController');

// Base route: /contacts

// GET all contacts (supports filtering, sorting, pagination)
router.get('/', getAllContacts);

// GET a single contact by ID
router.get('/:id', getContactById);

// POST a new contact
router.post('/', createContact);

// PUT (update) an existing contact by ID
router.put('/:id', updateContact);

// DELETE a contact by ID
router.delete('/:id', deleteContact);

// Export the router so it can be used in server.js
module.exports = router;
