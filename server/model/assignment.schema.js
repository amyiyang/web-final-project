const Schema = require('mongoose').Schema;

exports.AssignmentSchema = new Schema({
    instructorId: String,
    courseId: String,
}, { collection : 'assignments' });