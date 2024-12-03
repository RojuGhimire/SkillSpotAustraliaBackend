const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testimonialSchema = new Schema({
    image: {
        imageURL: {
            type: String,
            require: true
        },
        public_id: {
            type: String,
            require: true
        }
    },
    fullName: {
        type: String,
        required: true
    },
    statement: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
