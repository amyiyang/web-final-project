const mongoose = require("mongoose")
const InstructorSchema = require('./instructor.schema');

const InstructorModel = mongoose.model("Instructor", InstructorSchema);

function insertInstructor(instructor) {
    return InstructorModel.create(instructor);
}

function getAllInstructor() {
    return InstructorModel.find().exec();
}

// function findCourseByCourseId(owner) {
//     return CourseModel.find({owner: owner}).exec();
// }


function findInstructorById(id) {
    return InstructorModel.findById(id).exec();
}

function getInstructorByUserName(username) {
    return InstructorModel.findOne({username: username}).exec();
}

function updateInstructor(id, instructor) {
    return InstructorModel.updateOne({_id: id}, {$set: instructor})
}

function deleteInstructor(id) {
    return InstructorModel.deleteOne({_id: id});
}

module.exports = {
    insertInstructor,
    getAllInstructor,
    findInstructorById,
    updateInstructor,
    deleteInstructor,
    getInstructorByUserName
};