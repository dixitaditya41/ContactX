const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Contact name is required'],
    },
    email: {
        type: String,
        required: [true, 'Contact email is required'],
    },
    mobile: {
        type: String,
        required: [true, 'Contact mobile number is required'],
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v); 
            },
            message: 'Mobile number must be a 10-digit numeric value',
        },
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Contact', contactSchema);
