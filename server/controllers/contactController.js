const Contact = require('../models/contactModel');
const {asyncHandler} = require('../middlewares/asyncHandler');

const createContact = asyncHandler(async (req, res) => {
    const { name, email, mobile } = req.body;

    if (!name || !email || !mobile) {
        res.status(400);
        throw new Error('All fields are required');
    }

    const contact = await Contact.create({
        user: req.user._id,
        name,
        email,
        mobile,
    });

    res.status(201).json(contact);
});

// Get all Contacts
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user: req.user._id });
    res.status(200).json(contacts);
});

// Update a Contact
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact ) {
        res.status(404);
        throw new Error('Contact not found');
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedContact);
});

// Delete a Contact
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }

    res.status(200).json({ message: 'Contact removed' });
});


module.exports = { createContact, getContacts, updateContact, deleteContact };
