const express = require('express');
const router = express.Router();

const RegistrationAccessor = require('../model/registration.model');
const CourseAccessor = require('../model/course.model')

router.get('/', (req, res) => {
    return RegistrationAccessor.getAllRegistration()
        .then((response) => res.status(200).send(response),
            (error) =>  res.status(404).send(`Error finding Registration:${error}`));

});

router.post('/', (req, res) => {
    req.body.studentId = req.username;
    return RegistrationAccessor.insertRegistration(req.body)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error creating Registration:${error}`))
});

router.get('/registration/:id', function (req, res) {
    return RegistrationAccessor.findRegistrationById(req.params.id)
        .then((response) => res.status(200).send(response),
            (error) =>  res.status(404).send(`Error finding Registration:${error}`));
});

router.delete('/:id', function (req, res) {
    const id = req.params.id;
    return RegistrationAccessor.deleteRegistration(id)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error deleting Registration:${error}`))
});

router.put('/:id', function (req, res) {
    const id = req.params.id;
    return RegistrationAccessor.updateRegistration(id, req.body)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error updating Registration:${error}`))
});

router.get('/student', function(req, res) {
    const studentId = req.username;
    console.log("backend studentID" + studentId);

    return RegistrationAccessor.getRegistrationByStudentId(studentId, req.body)
        .then((response) => {
                return res.status(200).send(response);
            // } else {
            //     return res.status(200).send("No Registration");
            // }
        })
        .catch((error) => console.error(`Something went wrong: ${error}`));
});

router.get('/courses', function(req, res) {
    const courseId = req.body.courseId;
    // return res.status(200).send(studentId);
    return RegistrationAccessor.getRegistrationByCourseId(courseId, req.body)
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
                return res.status(400).send("No Student");
            }
        })
        .catch((error) => console.error(`Something went wrong: ${error}`));
})

module.exports = router;