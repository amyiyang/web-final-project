import React from "react";
import {connect} from 'react-redux';
import {fetchRegistrationCourses, cancelRegistration} from '../studentActions/registration.action'
import {withRouter} from "react-router";
import {selectUser} from "../studentActions/user.action";


class Registrations extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {

        this.props.getCourses();
    }

    render() {
        if (this.props.loading) {
            return <h3>Loading...</h3>
        }

        return (<div>
            <h1>Registered</h1>
            <div>{this._renderCourseList()}</div>
        </div>);
    }

    _cancelRegistration(id) {
        this.props.cancelRegistration(id, this.props.user.student.availableCredits);
    }

    _renderCourseList() {
        const courseRows = this.props.course.courses;
        const registrationRows = this.props.registration;
        // if(registrationRows !== null && registrationRows.length > 0)  {
        //     for (let i = 0; i < registrationRows.length; i++) {
        //         for (let j = 0; j < courseRows.length; j++) {
        //             if (registrationRows[i].courseId = courseRows[j]._id) {
        //                 registrationRows[i].capacity = courseRows[j].capacity;
        //                 registrationRows[i].location = courseRows[j].location;
        //                 registrationRows[i].startTime = courseRows[j].startTime;
        //                 registrationRows[i].endTime = courseRows[j].endTime;
        //             }
        //         }
        //     }
        // }

        const rows = registrationRows.map(registration => (
            <tr key={registration._id}>
                <td>{registration.courseId}</td>
                <td>{registration.capacity}</td>
                <td>{registration.location}</td>
                <td>{new Date(registration.startTime).toUTCString()}</td>
                <td>{new Date(registration.endTime).toUTCString()}</td>
                <td><input type='button' value='Cancel' onClick={() => this._cancelRegistration(registration._id)}/> </td>
            </tr>));
        return (<table>
            <thead>
            <tr>
                {/*<th>id</th>*/}
                <th>courseId</th>
                <th>capacity</th>
                <th>location</th>
                <th>start</th>
                <th>end</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>)
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        getCourses: () => dispatch(fetchRegistrationCourses()),
        cancelRegistration: (courseId, currentCredit) =>
            dispatch(cancelRegistration(courseId,  currentCredit)),
    }
}


function mapStateToProps(state, props) {
    return { ...state.registration,
        username: state.user.username,
        course: state.course,
        user: state.user,
    }
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Registrations))