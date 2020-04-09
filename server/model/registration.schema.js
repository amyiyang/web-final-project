const Schema = require('mongoose').Schema;

exports.RegistrationSchema = new Schema({
    studentId: String,
    courseId: String,
}, { collection : 'registrations' });