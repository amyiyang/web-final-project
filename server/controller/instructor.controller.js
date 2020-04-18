const express = require('express');
const router = express.Router();

const InstructorModel = require('../model/instructor.model');
// import bcrypt
const bcrypt = require("bcryptjs");
const authParser = require('../middleware/middleware_auth.middleware')


router.post('/', (req, res) => {
    if(!req.body._id || !req.body.username || !req.body.password) {
        return res.status(404).send({message: "Must include username AND password"});
    }

    const {username, password} = req.body;

    return InstructorModel.insertInstructor(req.body)
        .then((user) => {
                req.session.username = username;
                return res//.cookie('token', token, {httpOnly: true})
                    .status(200).send({username});
            },
            error => res.status(500).send(error));
});

router.post('/authenticate', function (req, res) {
    if(!req.body.username || !req.body.password) {
        return res.status(404).send({message: "Must write username AND password"});
    }
    const {username, password} = req.body;

    InstructorModel.getInstructorByUserName(req.body.username)
        .then((user) => {
            if(!user) {
                return res.status(404).send({message:"username does not exist"});
            }
            user.comparePassword(password, (error, match) => {
                if (match) {
                    req.session.username = username;
                    return res.status(200).send(req.session);
                }
                return res.status(400).send({message:"The password does not match"});
            });
        })
        .catch((error) => console.error(`Something went wrong: ${error}`));
});

router.get('/loggedIn', authParser, function(req, res) {
    return res.sendStatus(200);
});

router.get('/', (req, res) => InstructorModel.getAllInstructor()
    .then(users => res.send(users)));

//cannot change password
router.put('/:id', function (req, res) {
    const id = req.params.id;
    return InstructorModel.updateInstructor(id, req.body)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error updating Instructor:${error}`))
});

router.delete('/:id', function (req, res) {
    const id = req.params.id;
    return InstructorModel.deleteInstructor(id)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error deleting Instructor:${error}`))
});

router.get('/username/', authParser, function (req, res) {
    const username = req.username;
    return InstructorModel.getInstructorByUserName(username)
        .then((response) => res.status(200).send(response),
            (error) =>  res.status(404).send(`Error finding Instructor:${error}`));
});



module.exports = router;