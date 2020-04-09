const Schema = require('mongoose').Schema;

exports.CourseSchema = new Schema({
    _id: String,
    capacity: Number,
    location: String,
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: {
        type: Date,
        default: Date.now
    },
}, { collection : 'courses' });