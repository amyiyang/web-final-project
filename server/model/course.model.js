const mongoose = require("mongoose")
const CourseSchema = require('./course.schema').CourseSchema


const CourseModel = mongoose.model("Course", CourseSchema);

function insertCourse(course) {
    return CourseModel.create(course);
}

function getAllCourse() {
    return CourseModel.find().exec();
}

// function findCourseByCourseId(owner) {
//     return CourseModel.find({owner: owner}).exec();
// }


function findCourseById(id) {
    return CourseModel.findById(id).exec();
}

function updateCourse(id, course) {
    return CourseModel.update({_id: id}, {$set: course})
}

function deleteCourse(id) {
    return CourseModel.deleteOne({_id: id});
}

module.exports = {
    insertCourse,
    getAllCourse,
    findCourseById,
    updateCourse,
    deleteCourse
};