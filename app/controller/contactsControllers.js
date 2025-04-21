const {
    ContactModel,
    Pager,
    sortContacts,
    filterContacts
} = require('@jworkman-fs/asl');

// Clone contacts to avoid mutating original data
let contacts = [...ContactModel];

// GET /contacts
    const getAllContacts = (req, res) => {
        try {
        let results = [...contacts];

// Filter via query parameters
        if (Object.keys(req.query).length > 0) {
        results = filterContacts(results, req.query);
        }

// Sort via custom header: x-sort (e.g., "lastName:asc")
        const sortHeader = req.headers['x-sort'];
        if (sortHeader) {
        results = sortContacts(results, sortHeader);
        }

// Paginate via x-page and x-limit headers
        const pager = new Pager(results, req.headers);
        results = pager.pageData();
    
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve contacts.' });
    }
    };

// GET /contacts/:id
    const getContactById = (req, res) => {
    const contact = contacts.find(c => c.id === req.params.id);

    if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json(contact);
    };

// POST /contacts
    const createContact = (req, res) => {
    const { firstName, lastName, email, phone, birthday } = req.body;

    if (!firstName || !lastName || !email || !phone || !birthday) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newContact = {
        id: String(Date.now()),
        firstName,
        lastName,
        email,
        phone,
        birthday
    };

    contacts.push(newContact);
    res.status(201).json(newContact);
    };

// PUT /contacts/:id
    const updateContact = (req, res) => {
    const index = contacts.findIndex(c => c.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: 'Contact not found' });
    }

    const updatedContact = { ...contacts[index], ...req.body };
    contacts[index] = updatedContact;

    res.status(200).json(updatedContact);
    };

// DELETE /contacts/:id
    const deleteContact = (req, res) => {
    const index = contacts.findIndex(c => c.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: 'Contact not found' });
    }

    const deleted = contacts.splice(index, 1);
    res.status(200).json({ message: 'Contact deleted', deleted });
    };

    module.exports = {
        getAllContacts,
        getContactById,
        createContact,
        updateContact,
        deleteContact
    };

