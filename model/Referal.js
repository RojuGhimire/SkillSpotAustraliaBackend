const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const referalSchema = new Schema({
    refferalName: {
        type: String,
        required: true
    },
    refferalEmail: {
        type: String,
        required: true
    },
    refferalNumber: {
        type: Number,
        required: true
    },
    reffererName: {
        type: String,
        required: true
    },
    reffererEmail: {
        type: String,
        required: true
    },
    reffererNumber: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Referal', referalSchema);