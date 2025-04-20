// routes/contactsRoutes.js

const express = require('express');
const router = express.Router();

// Import controller functions
const {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
} = require('../controllers/contactsController');

// GET all contacts (supports filtering, sorting, pagination)
router.get('/', getAllContacts);

// GET a specific contact by ID
router.get('/:id', getContactById);

// POST a new contact
router.post('/', createContact);

// PUT (update) a contact by ID
router.put('/:id', updateContact);

// DELETE a contact by ID
router.delete('/:id', deleteContact);

module.exports = router;
