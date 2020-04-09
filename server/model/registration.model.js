const mongoose = require("mongoose")
const RegistrationSchema = require('./registration.schema').RegistrationSchema


const RegistrationModel = mongoose.model("Registration", RegistrationSchema);

function insertRegistration(registration) {
    return RegistrationModel.create(registration);
}

function getAllRegistration() {
    return RegistrationModel.find().exec();
}



function findRegistrationById(id) {
    return RegistrationModel.findById(id).exec();
}


function getRegistrationByStudentId(studentId) {
    return RegistrationModel.find({studentId: studentId}).exec();
}


function getRegistrationByCourseId (courseId) {
    return RegistrationModel.find({courseId: courseId}).exec();
}

function updateRegistration(id, registration) {
    return RegistrationModel.update({_id: id}, {$set: registration})
}

function deleteRegistration(id) {
    return RegistrationModel.deleteOne({_id: id});
}

module.exports = {
    insertRegistration,
    getAllRegistration,
    findRegistrationById,
    updateRegistration,
    deleteRegistration,
    getRegistrationByStudentId,
    getRegistrationByCourseId
};