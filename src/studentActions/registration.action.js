import Axios from 'axios'
import{fetchCourses} from "./course.action";
import {updateAvailableCredits} from "./user.action";

function loadingCourses() {
    return {
        type: "REQUEST_REGISTRATION_COURSES"
    }
}

function receiveCourseList(courses) {
    return {
        type: "RECEIVE_REGISTRATION_COURSES",
        courses
    }
}

// function inFlight() {
//     return {
//         type: "REQUEST_INFLIGHT"
//     }
// }

export function fetchRegistrationCourses() {
    return function(dispatch) {
        dispatch(loadingCourses());
        Axios.get(`/api/registration/student`)
         .then(response => {
             dispatch(receiveCourseList(response.data))},
             error => console.log('An error occurred.', error)
         )
    }
}

export function cancelRegistration(id, studentEmail, currentCredit) {
    return function(dispatch) {
        return Axios.delete(`/api/registration/${id}`)
            .then(
                (response) => dispatch(fetchRegistrationCourses()),
                error => console.log('An error occurred.', error)
            ).then(
                () => dispatch(updateAvailableCredits(true, studentEmail, currentCredit)),
                error => console.log('An error occurred.', error)
            )
    }
}

export function fetchAllRegistration() {
    return function(dispatch) {
        dispatch(loadingCourses());
        Axios.get(`/api/registration/`)
            .then(response => {
                    dispatch(receiveCourseList(response.data))},
                error => console.log('An error occurred.', error)
            )
    }
}

