const express = require('express');
const router = express.Router();

const AssignmentAccessor = require('../model/assignment.model');
const CourseAccessor = require('../model/course.model')

router.get('/', (req, res) => {
    return AssignmentAccessor.getAllAssignment()
        .then((response) => res.status(200).send(response),
            (error) =>  res.status(404).send(`Error finding Assignment:${error}`));

});

router.post('/', (req, res) => {
    return AssignmentAccessor.insertAssignment(req.body)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error creating Assignment:${error}`))
});

router.get('/assignment/:id', function (req, res) {
    return AssignmentAccessor.findAssignmentById(req.params.id)
        .then((response) => res.status(200).send(response),
            (error) =>  res.status(404).send(`Error finding Assignment:${error}`));
});

router.delete('/:id', function (req, res) {
    const id = req.params.id;
    return AssignmentAccessor.deleteAssignment(id)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error deleting Assignment:${error}`))
});

// delete assignment by course _id
router.delete('/courseId/:id', function (req, res) {
    const id = req.params.id;
    return AssignmentAccessor.deleteAssignmentByCourseId(id)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error deleting Assignment by CourseId:${error}`))
});

router.put('/:id', function (req, res) {
    const id = req.params.id;
    return AssignmentAccessor.updateAssignment(id, req.body)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error updating Assignment:${error}`))
});

router.get('/instructors', function(req, res) {
    const instructorId = req.body.instructorId;
    // return res.status(200).send(studentId);
    return AssignmentAccessor.getAssignmentByInstructorId(instructorId, req.body)
        .then((response) => {
            if(response.length > 0) {
                // const courseList = [];
                // for (const regist of response) {
                //     CourseAccessor.findCourseById(regist.courseId)
                //         .then((response) => {
                //             courseList.push(courseList);
                //         })
                // }
                return res.status(200).send(response);
            } else {
                return res.status(400).send("No Assignment");
            }
        })
        .catch((error) => console.error(`Something went wrong: ${error}`));
});

router.get('/courses', function(req, res) {
    const courseId = req.body.courseId;
    // return res.status(200).send(studentId);
    return AssignmentAccessor.getAssignmentByCourseId(courseId, req.body)
        .then((response) => {
            if(response.length > 0) {
                // const courseList = [];
                // for (const regist of response) {
                //     CourseAccessor.findCourseById(regist.courseId)
                //         .then((response) => {
                //             courseList.push(courseList);
                //         })
                // }
                return res.status(200).send(response);
            } else {
                return res.status(400).send("No Assignment");
            }
        })
        .catch((error) => console.error(`Something went wrong: ${error}`));
})

module.exports = router;