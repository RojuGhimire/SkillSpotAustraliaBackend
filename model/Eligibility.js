const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eligibilitySchema = new Schema({
    fullname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    contact: {
        type: Number,
        require: true
    },
    industry: {
        type: String,
        require: true
    },
    reqQualification: {
        type: String,
        require: true
    },
    expYears: {
        type: String,
        require: true
    },
    expPlace: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    formalQualification: {
        type: Boolean,
        require: true
    },
    questions: {
        type: String,
    }
});

module.exports = mongoose.model('Eligibility', eligibilitySchema);