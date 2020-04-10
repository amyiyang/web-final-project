import Axios from 'axios'
import{fetchCourses} from "./course.action";

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

export function fetchRegistrationCourses(userName) {
    const user = 'lulutest';
    let list = [];
    let registeredClasses =[];
    return function(dispatch) {
        dispatch(loadingCourses());
        Axios.get(`/api/registration/student?studentId=${user}`)
         .then(response => {
             list = response.data;
             // allCourses = response.data;
             dispatch(receiveCourseList(response.data))},
             error => console.log('An error occurred.', error)
         )
        // then(() => {
        //      for (let i=0; i<list.length;) {
        //          Axios.get(`/api/course/${list[i].courseId}`)
        //              .then(response => {
        //                  dispatch(receiveCourseList(response.data));
        //                  i++;
        //                  },
        //                  error => console.log('An error occurred.', error))
        //      }
        // })
    }
}

export function cancelRegistration(id) {
    return function(dispatch) {
        return Axios.delete(`/api/registration/${id}`)
            .then(
                (response) => dispatch(fetchRegistrationCourses()),
                error => console.log('An error occurred.', error)
            )
    }
}
