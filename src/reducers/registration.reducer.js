import {combineReducers} from 'redux'


// function inFlight(state = false, action) {
//     return action.type === 'REQUEST_INFLIGHT';
// }

function registration(state = [], action) {
    switch (action.type) {
        case 'RECEIVE_REGISTRATION_COURSES':
            return action.courses
    }
    return state;
}

function loading(state = true, action) {
    switch (action.type) {
        case 'RECEIVE_REGISTRATION_COURSES':
        case 'REQUEST_REGISTRATION_COURSES':
            return false;
        default:
            return state;
    }

}


export default combineReducers({
    registration,
    loading,
});

