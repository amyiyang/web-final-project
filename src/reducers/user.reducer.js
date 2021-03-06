import {combineReducers} from 'redux'

function valid(state = {
    success: false,
    message: '',
}, action) {
    switch (action.type) {
        case 'VALIDATE_REGISTER_USER':
            if (!action.password || !action.validatePassword || !action.username) {
                return {...state, message: 'All fields are required.'};
            }
            if (action.password !== action.validatePassword) {
                return {...state, message: 'The passwords must match.'};
            }
            return { success: true, message: '', };
        case 'VALIDATE_COURSE':
            console.dir(action)
            if (!action.instructor || !action.id || !action.capacity || !action.location
            || !action.startTime|| !action.endTime) {
                console.log("inside validation, false");
                return {...state, message: 'All fields are required'};
            }
            console.log("inside validation, true");
            return {success: true, message: '',};
        default:
            return {success: false, message: ''};
    }
}

function error(state = '', action) {
    switch (action.type) {
        case 'LOGIN_FAILURE':
            console.log(action.error);
            return action.error;
        case 'REGISTER_FAILURE':
            return action.error;
        case 'LOGIN_ATTEMPT':
        case 'REGISTER_ATTEMPT':
            return '';
        default:
            return state;
    }
}

function username(state = null, action) {
    switch (action.type) {
        case 'SELECT_USER':
            return action.username;
        case 'CLEAR':
            return null;
        default:
            return state;
    }
}

function instructor(state = null, action) {
    switch (action.type) {
        case 'SELECT_A_INSTRUCTOR':
            return action.user;
        case 'CLEAR':
            return null;
        default:
            return state;
    }
}



function student(state = null, action) {
    switch (action.type) {
        case 'SELECT_A_STUDENT':
            return action.student;
        case 'CLEAR':
            return null;
        default:
            return state;
    }
}

function inFlight(state = false, action) {
    return action.type === 'LOGIN_ATTEMPT';
}

function redirect(state = '', action) {
    if (action.type === 'LOGIN_SUCCESS' || action.type === 'REGISTER_SUCCESS') {
        return '/courses/';
    } else if (action.type === 'INSTRUCTOR_LOGIN_SUCCESS' || action.type === 'CREATE_ASSIGNMENT' || action.type === 'UPDATED_COURSE_ASSIGNMENT') {
        return '/instructor/courses';
    } else if (action.type === 'LOGOUT_SUCCESS') {
        return '/login';
    }
    return '';
}

function loading(state = true, action) {
    switch (action.type) {
        case 'REQUEST_STUDENT':
            return true;
        case 'REQUEST_INSTRUCTOR':
            return true;
        case 'SELECT_A_STUDENT':
            return false;
        case 'SELECT_A_INSTRUCTOR':
            return false;
        default:
            return state;
    }

}


export default combineReducers({
    error,
    inFlight,
    redirect,
    username,
    valid,
    student,
    loading,
    instructor
});

