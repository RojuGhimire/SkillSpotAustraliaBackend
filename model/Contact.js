const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Contact', contactSchema);