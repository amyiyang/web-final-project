import Axios from "axios";
import {fetchAllRegistration, fetchRegistrationCourses} from "../studentActions/registration.action";
import {fetchCourses} from "../studentActions/course.action"
import {getAssignmentByCourseId} from "../instructorActions/course.action"

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
                // console.dir(response);
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

export function deleteClass(id) {
    const courseId = id;
    return function (dispatch) {
        return Axios.delete(`/api/course/${id}`)
            .then(response => {
                    Axios.delete(`/api/assignment/courseId/${id}`)
                }
            ).then(response => dispatch(fetchCoursesAndAssignment()));
    }
}

export function updateCourse(course) {
    const assignment = {
        instructorId: course.instructor,
        courseId: course.id
    }
    return function (dispatch) {
        console.dir(course);
        return Axios.put(`/api/course/${course.id}`, course)
            .then(response =>
                dispatch(getAssignmentByCourseId(course.id))
            ).then ((response) =>
                Axios.put(`/api/assignment/${response.assignment[0]._id}`, assignment)
            ).then(response => dispatch(updateCourseAssignment()))
    }
}

function updateCourseAssignment() {
    return {
        type: "UPDATED_COURSE_ASSIGNMENT"
    }
}