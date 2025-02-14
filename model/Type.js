const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TypeSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Type', TypeSchema);
