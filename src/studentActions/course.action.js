import Axios from 'axios'

function loadingCourses() {
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

export function registerAClass(courseId, studentId){
    console.log(courseId);
    console.log(studentId);
    const requestBody = {
        courseId: courseId,
        studentId: studentId
    }
    return function(dispatch) {
        dispatch(inFlight());
        return Axios.post(`/api/registration`, requestBody)
            // .then(response => dispatch(),
            //     error => console.log('An error occurred.', error)
            // );
    }
}