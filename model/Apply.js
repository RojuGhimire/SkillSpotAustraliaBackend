const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applySchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    appliedCourse: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Apply', applySchema);