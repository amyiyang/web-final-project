const express = require('express');
const router = express.Router();

const InstructorModel = require('../model/instructor.model');
// import bcrypt
const bcrypt = require("bcryptjs");


router.post('/', (req, res) => {
    if(!req.body._id || !req.body.username || !req.body.password) {
        return res.status(404).send({message: "Must include username AND password"});
    }

    // req.body.password = bcrypt.hashSync(req.body.password, 10);

    return InstructorModel.insertInstructor(req.body)
        .then((user) => {
                // console.dir(user);
                return res.status(200).send(user)
            },
            error => res.status(500).send(error));
});

router.post('/authenticate', function (req, res) {
    if(!req.body.username || !req.body.password) {
        return res.status(404).send({message: "Must write username AND password"});
    }

    InstructorModel.getInstructorByUserName(req.body.username)
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



module.exports = router;