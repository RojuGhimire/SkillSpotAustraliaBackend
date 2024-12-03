const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    fullname: {
        type: String
    },
    number: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    gender: {
        type: String
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    roles: {
        Client: {
            type: Number,
            default: 1548
        }
    },
    password: {
        type: String,
        required: true
    },
    enrolledCourses: [
        {
            course: {
                type: String
            }
        }
    ],
    certificates: [
        {
            certificateName: {
                type: String
            },
            certificate: {
                type: String
            }
        }
    ],
    OTP: String,
    refreshToken: String
});

module.exports = mongoose.model('Client', clientSchema);