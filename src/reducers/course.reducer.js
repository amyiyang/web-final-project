import {combineReducers} from 'redux'


function inFlight(state = false, action) {
    return action.type === 'REQUEST_INFLIGHT';
}

function courses(state = [], action) {
    switch (action.type) {
        case 'RECEIVE_COURSES':
            return action.courses
    }
    return state;
}

function loading(state = true, action) {
    switch (action.type) {
        case 'RECEIVE_COURSES':
        case 'REQUEST_COURSES':
            return false;
        default:
            return state;
    }

}

function registrations(state = [], action) {
    switch (action.type) {
        case 'RECEIVE_REGISTRATION':
            return action.registrations
    }
    return state;
}

function getACourse(state = {}, action) {
    switch (action.type) {
        case 'RECEIVE_COURSE_BY_ID':
            console.log(action.course);
            return action.course
    }
    return state;
}

function getAssignment(state = {}, action) {
    switch (action.type) {
        case 'RECEIVE_ASSIGNMENT_BY_COURSE_ID':
            console.log(action.assignment);
            return action.assignment[0]
    }
    return state;
}


export default combineReducers({
    inFlight,
    courses,
    loading,
    registrations,
    getACourse,
    getAssignment
});

