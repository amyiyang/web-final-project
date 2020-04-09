const express = require('express');
const router = express.Router();

const CourseAccessor = require('../model/course.model');

router.get('/', (req, res) => {
    return CourseAccessor.getAllCourse()
        .then((response) => res.status(200).send(response),
            (error) =>  res.status(404).send(`Error finding Course:${error}`));

});

router.post('/', (req, res) => {
    return CourseAccessor.insertCourse(req.body)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error creating Course:${error}`))
});

router.get('/:id', function (req, res) {
    return CourseAccessor.findCourseById(req.params.id)
        .then((response) => res.status(200).send(response),
            (error) =>  res.status(404).send(`Error finding Course:${error}`));
});

router.delete('/:id', function (req, res) {
    const id = req.params.id;
    return CourseAccessor.deleteCourse(id)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error deleting Course:${error}`))
});

router.put('/:id', function (req, res) {
    const id = req.params.id;
    return CourseAccessor.updateCourse(id, req.body)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error updating Course:${error}`))
});

module.exports = router;