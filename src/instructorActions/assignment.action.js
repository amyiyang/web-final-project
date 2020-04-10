import Axios from "axios";
import {fetchAllRegistration, fetchRegistrationCourses} from "../studentActions/registration.action";
import {fetchCourses} from "../studentActions/course.action"

export function fetchCoursesAndAssignment(instructorId){
    return function(dispatch) {
        return dispatch(fetchCourses())
            .then(
            () => {
                dispatch(fetchAllRegistration())
            },
                error => console.log('An error occurred.', error)
            ).then(
                () => dispatch(fetchAllAssignment()),
                error => console.log('An error occurred.', error)
            )
    }
}

function loadingAssignment() {
    return {
        type: "REQUEST_ASSIGNMENT"
    }
}

function receiveAssignment(assignments) {
    return {
        type: "RECEIVE_ASSIGNMENT",
        assignments
    }
}

export function fetchAllAssignment() {
    return function(dispatch) {
        dispatch(loadingAssignment());
        Axios.get(`/api/assignment/`)
            .then(response => {
                dispatch(receiveAssignment(response.data))
            },  error =>console.log('An error occurred.', error)
            )
    }
}