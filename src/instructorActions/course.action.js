import Axios from "axios";


export function getRegistrationByCourseId(id){
    return function(dispatch) {
        // dispatch(loadingAssignment());
        Axios.get(`/api/registration/courses/${id}`)
            .then(response => {
                    dispatch(receiveRegistrations(response.data))
                },  error =>console.log('An error occurred when getting registrations.', error)
            )
    }
}

function receiveRegistrations(registrations) {
    return {
        type: "RECEIVE_REGISTRATION",
        registrations: registrations
    }
}