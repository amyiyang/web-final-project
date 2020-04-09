const mongoose = require("mongoose")
const StudentSchema = require('./student.schema');

const StudentModel = mongoose.model("Student", StudentSchema);

function insertStudent(student) {
    return StudentModel.create(student);
}

function getAllStudent() {
    return StudentModel.find().exec();
}

// function findCourseByCourseId(owner) {
//     return CourseModel.find({owner: owner}).exec();
// }


function findStudentById(id) {
    return StudentModel.findById(id).exec();
}

function updateStudent(id, student) {
    return StudentModel.update({_id: id}, {$set: student})
}

function deleteStudent(id) {
    return StudentModel.deleteOne({_id: id});
}

function getStudentByUserName(username) {
    return StudentModel.findOne({username: username}).exec();
}


module.exports = {
    insertStudent,
    getAllStudent,
    findStudentById,
    updateStudent,
    deleteStudent,
    getStudentByUserName
};