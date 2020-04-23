import Axios from "axios";
import {loadingCourses} from "../studentActions/course.action";
import {fetchCoursesAndAssignment} from "./assignment.action";


// export function getRegistrationByCourseId(id){
//     return function(dispatch) {
//         // dispatch(loadingAssignment());
//         Axios.get(`/api/registration/courses/${id}`)
//             .then(response => {
//                     dispatch(receiveRegistrations(response.data))
//                 },  error =>console.log('An error occurred when getting registrations.', error)
//             )
//     }
// }

// export function updateCourse(course){
//     console.dir(course);
//     return function(dispatch) {
//         // dispatch(loadingAssignment());
//         Axios.put(`/api/registration/courses/${course.id}`, course)
//             .then(response => {
//                     dispatch(fetchCourses(response.data))
//                 },  error =>console.log('An error occurred when getting registrations.', error)
//             )
//     }
// }

function receiveRegistrations(registrations) {
    return {
        type: "RECEIVE_REGISTRATION",
        registrations: registrations
    }
}

export function getCourseById(id) {
    console.log(id);
    return function(dispatch) {
        dispatch(loadingCourses());
        return Axios.get(`/api/course/${id}`)
            .then(response => dispatch(receiveCourseById(response.data)),
                error => console.log('An error occurred.', error)
            );
    }
}

export function getAssignmentByCourseId(id) {
    console.log(id);
    return function(dispatch) {
        dispatch(loadingCourses());
        return Axios.get(`/api/assignment/courseId/${id}`)
            .then(response => dispatch(receiveAssignmentByCourseId(response.data)),
                error => console.log('An error occurred.', error)
            );
    }
}

function receiveAssignmentByCourseId(assignment) {
    console.dir(assignment);
    return {
        type: "RECEIVE_ASSIGNMENT_BY_COURSE_ID",
        assignment: assignment
    }
}

function receiveCourseById(course) {
    console.dir(course);
    return {
        type: "RECEIVE_COURSE_BY_ID",
        course: course
    }
}