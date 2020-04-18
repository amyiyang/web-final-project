import Axios from "axios";
import {fetchAllRegistration, fetchRegistrationCourses} from "../studentActions/registration.action";
import {fetchCourses} from "../studentActions/course.action"

export function fetchCoursesAndAssignment(){
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

export function validate(course) {
    return  {...course,
        type: 'VALIDATE_COURSE'
    }
}

function createAssignment() {
    return {
        type: 'CREATE_ASSIGNMENT'
    }
}

export function create(instructor, id, capacity, location, startTime, endTime) {
    const course ={
        _id: id,
        capacity: capacity,
        location: location,
        startTime: startTime,
        endTime: endTime
    }
    const assignment ={
        instructorId: instructor,
        courseId: id
    }
    return function (dispatch) {
        return Axios.post(`/api/course/`, course)
            .then(response => {
                    Axios.post(`/api/assignment/`, assignment)
                }
            ).then(response => dispatch(createAssignment()));
    }
}