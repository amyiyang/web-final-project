import Axios from 'axios'

function loginAttempt() {
    return {
        type: "LOGIN_ATTEMPT"
    }
}

function loginSuccess(username) {
    return {
        type: "LOGIN_SUCCESS",
        username
    }
}

function loginFailure(error) {
    return {
        type: "LOGIN_FAILURE",
        error
    }
}

function registerAttempt() {
    return {
        type: "REGISTER_ATTEMPT"
    }
}

function registerSuccess(username) {
    return {
        type: "REGISTER_SUCCESS",
        username
    }
}

function registerFailure(error) {
    return {
        type: "REGISTER_FAILURE",
        error
    }
}


export function selectUser(username) {
    return {
        type: "SELECT_USER",
        username
    }
}

export function selectStudent(student) {
    return {
        type: "SELECT_A_STUDENT",
        student
    }
}

export function validate(user) {
    return  {...user,
        type: 'VALIDATE_REGISTER_USER'}
}

export function clear() {
    return {
        type: "CLEAR"
    }
}

export function login(user) {
    console.dir(user);
    return function (dispatch) {
        dispatch(loginAttempt());
        return Axios.post('/api/student/authenticate', user)
            .then(response => dispatch(loginSuccess(response.data.username)),
                error => dispatch(loginFailure(error.response.data))
            );
    }
}

export function register(_id, username, password) {

    const student ={
        _id: _id,
        username: username,
        password: password,
        availableCredits: 5
    }
    return function (dispatch) {
        dispatch(registerAttempt());
        return Axios.post(`/api/student/`, student)
            .then(response => {
                console.dir(response.data);
                dispatch(registerSuccess(response.data.username))
                },
                error => dispatch(registerFailure(error.response.data.message))
            );
    }
}

export function loading(){
    return {
        type: "REQUEST_STUDENT"
    }
}

export function getStudent(username) {
    console.log(username)
    return function(dispatch) {
        dispatch(loading());
        return Axios.get(`/api/student/username/${username}`)
            .then(response => dispatch(selectStudent(response.data)),
                error => console.log('An error occurred.', error)
            )
    }
}

export function updateAvailableCredits (adding, username, id, currentCredit) {
    const student = {
        availableCredits: currentCredit
    }
    if (adding) {
        student.availableCredits += 1;
    } else {
        student.availableCredits -= 1;
    }
    console.log("new student");
    console.dir(student);
    return function(dispatch) {
        return Axios.put(`/api/student/${id}`, student)
            .then(
                () => dispatch(getStudent(username)),
                error => console.log('An error occurred.', error)
            )
    }
}