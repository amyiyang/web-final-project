const mongoose = require("mongoose")
const AssignmentSchema = require('./assignment.schema').AssignmentSchema


const AssignmentModel = mongoose.model("Assignment", AssignmentSchema);

function insertAssignment(assignment) {
    return AssignmentModel.create(assignment);
}

function getAllAssignment() {
    return AssignmentModel.find().exec();
}



function findAssignmentById(id) {
    return AssignmentModel.findById(id).exec();
}


function getAssignmentByCourseId(courseId) {
    return AssignmentModel.find({courseId: courseId}).exec();
}


function getAssignmentByInstructorId(instructorId) {
    return AssignmentModel.find({instructorId: instructorId}).exec();
}

function updateAssignment(id, assignment) {
    return AssignmentModel.update({_id: id}, {$set: assignment})
}

function deleteAssignment(id) {
    return AssignmentModel.deleteOne({_id: id});
}

module.exports = {
    insertAssignment,
    getAllAssignment,
    findAssignmentById,
    getAssignmentByCourseId,
    getAssignmentByInstructorId,
    updateAssignment,
    deleteAssignment
};