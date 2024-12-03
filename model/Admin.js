const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        Admin: {
            type: Number,
            default: 1549
        },
        SpecialAccess: Number,
        SuperAdmin: Number
    },
    refreshToken: String
})

module.exports = mongoose.model('Admin', adminSchema);
