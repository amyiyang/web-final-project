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

export default combineReducers({
    inFlight,
    courses,
    loading,
    registrations
});

