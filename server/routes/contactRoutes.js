const express = require('express');
const { authenticate } = require('../middlewares/authMiddleware');
const { createContact, getContacts, updateContact, deleteContact } = require('../controllers/contactController');
const router = express.Router();

router.post('/', authenticate, createContact);
router.get('/', authenticate, getContacts);
router.put('/:id', authenticate, updateContact);
router.delete('/:id', authenticate, deleteContact);

module.exports = router;
