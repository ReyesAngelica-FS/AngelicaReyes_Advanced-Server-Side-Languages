// routes/contactsRoutes.js

const express = require('express');
const router = express.Router();
const {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
} = require('../controllers/contactsController');

// GET all contacts
router.get('/', getAllContacts);

// GET contact by ID
router.get('/:id', getContactById);

// POST new contact
router.post('/', createContact);

// PUT update contact
router.put('/:id', updateContact);

// DELETE contact
router.delete('/:id', deleteContact);

module.exports = router;
