import React from "react";
import {connect} from 'react-redux';
import {fetchRegistrationCourses, cancelRegistration} from '../studentActions/registration.action'
import {withRouter} from "react-router";
import {selectUser} from "../studentActions/user.action";
import {Button, Table} from "react-bootstrap";


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
            <div>{this._renderCourseList()}</div>
        </div>);
    }

    _cancelRegistration(id) {
        this.props.cancelRegistration(id, this.props.user.student.availableCredits);
    }

    _renderCourseList() {
        const courseRows = this.props.course.courses;
        // console.dir(courseRows);
        const registrationRows = this.props.registration;
        // console.dir(registrationRows);
        const registered = [];
        for (let i = 0; i < registrationRows.length; i++) {
            let found = courseRows.find(function(element) {
                return element._id === registrationRows[i].courseId;
            });
            found.registrationId = registrationRows[i]._id;
            registered.push(found);
        }
        // console.dir(registered)
        if (registrationRows.length === 0) {
            return (
                <div>You have no class registration yet</div>
            )
        }
        const sorted = registered.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
        // console.dir(sorted);
        const registeredRows = sorted.map(registration => (
            <tr key={registration._id}>
                <td>{registration._id}</td>
                <td>{registration.capacity}</td>
                <td>{registration.location}</td>
                <td>{new Date(registration.startTime).toUTCString()}</td>
                <td>{new Date(registration.endTime).toUTCString()}</td>
                <td>
                    {/*<input type='button' value='Cancel' onClick={() => this._cancelRegistration(registration.registrationId)}/>*/}
                    <Button variant={'link'} value='Cancel' onClick={() => this._cancelRegistration(registration.registrationId)}>Cancel</Button>
                </td>
            </tr>));
        return (<Table striped size="sm" bordered responsive>
            <thead>
            <tr>
                <th>CourseId</th>
                <th>Capacity</th>
                <th>Location</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {registeredRows}
            </tbody>
        </Table>)

        // const rows = registrationRows.map(registration => (
        //     <tr key={registration._id}>
        //         <td>{registration.courseId}</td>
        //         <td>{registration.capacity}</td>
        //         <td>{registration.location}</td>
        //         <td>{new Date(registration.startTime).toUTCString()}</td>
        //         <td>{new Date(registration.endTime).toUTCString()}</td>
        //         <td><input type='button' value='Cancel' onClick={() => this._cancelRegistration(registration._id)}/> </td>
        //     </tr>));
        // return (<Table striped size="sm" bordered responsive>
        //     <thead>
        //     <tr>
        //         <th>CourseId</th>
        //         <th>Capacity</th>
        //         <th>Location</th>
        //         <th>Start Time</th>
        //         <th>End Time</th>
        //         <th></th>
        //     </tr>
        //     </thead>
        //     <tbody>
        //     {rows}
        //     </tbody>
        // </Table>)
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