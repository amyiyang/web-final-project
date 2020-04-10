const express = require('express');
const router = express.Router();

const StudentModel = require('../model/student.model');
// import bcrypt
const bcrypt = require("bcryptjs");


router.post('/', (req, res) => {
    if(!req.body._id || !req.body.username || !req.body.password) {
        return res.status(404).send({message: "Must include email, username AND password"});
    }

    //check if username exists
    StudentModel.getStudentByUserName(req.body.username)
        .then((userNameExists) => {
            if(userNameExists) {
                return res.status(404).send({message:"username exists"});
            } else {
                //check if email exists
                StudentModel.findStudentById(req.body._id)
                    .then((emailExists) => {
                        if (emailExists) {
                            return res.status(404).send({message:"email exists"});
                        } else {
                            return StudentModel.insertStudent(req.body)
                                .then((user) => {
                                        return res.status(200).send(user)
                                    },
                                    error => res.status(500).send(error));
                        }
                    })
            }
        })
        .catch((error) => console.error(`Something went wrong: ${error}`));
});

router.post('/authenticate', function (req, res) {
    if(!req.body.username || !req.body.password) {
        return res.status(404).send({message: "Must write username AND password"});
    }
    StudentModel.getStudentByUserName(req.body.username)
        .then((user) => {
            // Notice that we're not using bcrypt directly anywhere in the controller.
            // All of that behavior is getting handled closer to the database level/layer
            user.comparePassword(req.body.password, (error, match) => {
                if (match) {
                    res.send(user);
                }
                return res.status(404).send({message:"The password does not match"});
            });
        })
        .catch((error) => console.error(`Something went wrong: ${error}`));
});

router.get('/', (req, res) => StudentModel.getAllStudent()
    .then(students => res.send(students)));

router.delete('/:id', function (req, res) {
    const id = req.params.id;
    return StudentModel.deleteStudent(id)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error deleting Student:${error}`))
});

router.put('/:id', function (req, res) {
    const id = req.params.id;
    return StudentModel.updateStudent(id, req.body)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error updating Student:${error}`))
});

router.get('/username/:id', function (req, res) {
    return StudentModel.getStudentByUserName(req.params.id)
        .then((response) => res.status(200).send(response),
            (error) =>  res.status(404).send(`Error finding Student:${error}`));
});

module.exports = router;