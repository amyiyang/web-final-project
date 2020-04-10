import {combineReducers} from 'redux'


// function inFlight(state = false, action) {
//     return action.type === 'REQUEST_INFLIGHT';
// }

function assignment(state = [], action) {
    switch (action.type) {
        case 'RECEIVE_ASSIGNMENT':
            return action.assignments
    }
    return state;
}

function assignmentLoading(state = true, action) {
    switch (action.type) {
        case 'RECEIVE_ASSIGNMENT':
        case 'REQUEST_ASSIGNMENT':
            return false;
        default:
            return state;
    }

}


export default combineReducers({
    assignment,
    assignmentLoading,
});
