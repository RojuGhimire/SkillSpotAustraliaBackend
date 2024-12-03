const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
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
    title: {
        type: String,
        require: true
    },
    miniDescription: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    shares: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Blog', blogSchema);