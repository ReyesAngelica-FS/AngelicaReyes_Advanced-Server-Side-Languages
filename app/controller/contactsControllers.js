const {
    ContactModel,
    Pager,
    sortContacts,
    filterContacts,
    ContactNotFoundError,
    DuplicateContactResourceError,
    InvalidContactError,
    InvalidContactFieldError,
    InvalidContactSchemaError,
    PagerOutOfRangeError,
    InvalidEnumError,
    PagerLimitExceededError
} = require('@jworkman-fs/asl');


// Clone original dataset
let contacts = ContactModel;

// GET /contacts
const getAllContacts = (req, res) => {
    try {
        let results = [...contacts];

        // 1. FILTERING (via headers)
        const filterBy = req.get('X-Filter-By');
        const filterOp = req.get('X-Filter-Op');
        const filterValue = req.get('X-Filter-Value');

        if (filterBy && filterOp && filterValue) {
            results = filterContacts(results, filterBy, filterOp, filterValue);
        }

        // 2. SORTING (via query params)
        const sortBy = req.query.sort;
        const sortDirection = req.query.direction;
        if (sortBy && sortDirection) {
            results = sortContacts(results, sortBy, sortDirection);
        }

        // 3. PAGINATION (via query params)
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;
    
        const pager = new Pager(results, page, size);
        res.set('X-Page-Total', pager.total());
        res.set('X-Page-Next', pager.next());
        res.set('X-Page-Prev', pager.prev());
        res.status(200).json(pager.results());
    
    } catch (e) {
        handleError(res, e);
    }
};

// GET /contacts/:id
const getContactById = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const contact = contacts.find(c => c.id === id);
    
        if (!contact) throw new ContactNotFoundError(`Contact with ID ${id} not found`);
    
        res.status(200).json(contact);
    } catch (e) {
        handleError(res, e);
    }
};

// POST /contacts
const createContact = (req, res) => {
    try {
        const existing = contacts.find(c => c.email === req.body.email);
        if (existing) throw new DuplicateContactResourceError(`Duplicate email: ${req.body.email}`);

        const newContact = ContactModel.create(req.body);
        contacts.push(newContact);
        res.status(201).json(newContact);
    } catch (e) {
        handleError(res, e);
    }
};

// PUT /contacts/:id
const updateContact = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = contacts.findIndex(c => c.id === id);
        if (index === -1) throw new ContactNotFoundError(`Contact with ID ${id} not found`);
    
        const updated = ContactModel.update(id, req.body);
        contacts[index] = updated;
    
        res.status(303).redirect(`/contacts/${id}`);
    } catch (e) {
        handleError(res, e);
    }
};

// DELETE /contacts/:id
const deleteContact = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = contacts.findIndex(c => c.id === id);
        if (index === -1) throw new ContactNotFoundError(`Contact with ID ${id} not found`);
    
        const deleted = contacts.splice(index, 1);
        res.status(200).json(deleted[0]);
    } catch (e) {
        handleError(res, e);
    }
};

// Shared error handler
function handleError(res, e) {
    switch (e.name) {
    case 'ContactNotFoundError':
        return res.status(404).json({ message: e.message });
    case 'DuplicateContactResourceError':
    case 'InvalidContactError':
    case 'InvalidContactFieldError':
    case 'InvalidContactSchemaError':
    case 'InvalidEnumError':
        return res.status(400).json({ message: e.message });
    case 'PagerOutOfRangeError':
    case 'PagerLimitExceededError':
        return res.status(416).json({ message: e.message });
    default:
        return res.status(500).json({ message: e.message || 'Unexpected server error' });
    }
}

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
};
