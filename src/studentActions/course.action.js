import Axios from 'axios'
import{fetchRegistrationCourses} from "./registration.action";
import {updateAvailableCredits} from "./user.action"

export function loadingCourses() {
    return {
        type: "REQUEST_COURSES"
    }
}

function receiveCourseList(courses) {
    return {
        type: "RECEIVE_COURSES",
        courses
    }
}

function inFlight() {
    return {
        type: "REQUEST_INFLIGHT"
    }
}

export function fetchCourses() {
    return function(dispatch) {
        dispatch(loadingCourses());
        return Axios.get(`/api/course`)
            .then(response => dispatch(receiveCourseList(response.data)),
                error => console.log('An error occurred.', error)
            );
    }
}



export function registerAClass(courseId, currentCredit){
    const requestBody = {
        courseId: courseId,
    }
    return function(dispatch) {
        dispatch(inFlight());
        return Axios.post(`/api/registration`, requestBody)
           .then(
                () => dispatch(fetchRegistrationCourses()),
                error => console.log('An error occurred.', error)
            )
            .then(
                () => dispatch(updateAvailableCredits(false, currentCredit)),
                error => console.log('An error occurred.', error)
            )
    }
}