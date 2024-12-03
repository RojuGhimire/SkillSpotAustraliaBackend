const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
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
    courseCode: {
        type: String,
        require: true,
        unique: true
    },
    courseName: {
        type: String,
        require: true
    },
    courseType: {
        type: String,
        require: true,
    },
    courseIntroduction: {
        type: String,
        require: true
    },
    offeredBy: {
        type: String,
        require: true
    },
    duration: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Course', courseSchema);
