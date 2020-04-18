const express = require('express');
const router = express.Router();

const StudentModel = require('../model/student.model');
// import bcrypt
const bcrypt = require("bcryptjs");

const authParser = require('../middleware/middleware_auth.middleware')

router.post('/', (req, res) => {
    if(!req.body._id || !req.body.username || !req.body.password) {
        return res.status(404).send({message: "Must include email, username AND password"});
    }
    const {username, password} = req.body;
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
                                        req.session.username = username;
                                        return res//.cookie('token', token, {httpOnly: true})
                                            .status(200).send({username});
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
    const {username, password} = req.body;
    StudentModel.getStudentByUserName(req.body.username)
        .then((user) => {
            if(!user) {
                return res.status(404).send({message:"username does not exist"});
            }
            // Notice that we're not using bcrypt directly anywhere in the controller.
            // All of that behavior is getting handled closer to the database level/layer
            user.comparePassword(password, (error, match) => {
                if (match) {
                    req.session.username = username;
                    return res//.cookie('token', token, {httpOnly: true})
                        .status(200).send(req.session);
                }
                return res.status(400).send({message:"The password does not match"});
            });
        })
        .catch((error) => console.error(`Something went wrong: ${error}`));
});

router.post('/logOut', function(req, res){

    if(req.session) {
        req.session.destroy(function(error) {
          if(error) {
              return next(error);
          } else {
              return res.status(200).send(req.session);
          }
        })
    }
})

router.get('/loggedIn', authParser, function(req, res) {
    return res.sendStatus(200);
});

router.get('/', (req, res) => StudentModel.getAllStudent()
    .then(students => res.send(students)));

router.delete('/:id', function (req, res) {
    const id = req.params.id;
    return StudentModel.deleteStudent(id)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error deleting Student:${error}`))
});

router.put('/', authParser, function (req, res) {
    const username = req.username;
    console.log("backend" + username);
    StudentModel.updateStudent(username, req.body)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error updating Student:${error}`))
});

router.get('/username/', authParser, function (req, res) {
    const username = req.username;

    return StudentModel.getStudentByUserName(username)
        .then((response) => res.status(200).send(response),
            (error) =>  res.status(404).send(`Error finding Student:${error}`));
});

module.exports = router;