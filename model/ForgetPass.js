const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const forgetPassSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('ForgetPass', forgetPassSchema);