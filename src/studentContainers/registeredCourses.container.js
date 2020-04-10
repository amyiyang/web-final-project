import React from "react";
import {connect} from 'react-redux';
import {fetchRegistrationCourses, cancelRegistration} from '../studentActions/registration.action'
// import {addPokemon, deletePokemon, fetchPokemon} from '../studentActions/pokemon.action'
import {withRouter} from "react-router";
import {selectUser} from "../studentActions/user.action";


class Registrations extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        const { match } = this.props;
        const { username } = match.params;
        this.props.setUser(username);
        this.props.getCourses(username);
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
        this.props.cancelRegistration(id);
    }

    _renderCourseList() {
        const registrationRows = this.props.registration.map(registration => (
            <tr key={registration._id}>
                <td>{registration.courseId}</td>
                {/*<td>{course.capacity}</td>*/}
                {/*<td>{course.location}</td>*/}
                {/*<td>{new Date(course.startTime).toUTCString()}</td>*/}
                {/*<td>{new Date(course.endTime).toUTCString()}</td>*/}
                <td><input type='button' value='Cancel' onClick={() => this._cancelRegistration(registration._id)}/> </td>
            </tr>));
        return (<table>
            <thead>
            <tr>
                {/*<th>id</th>*/}
                <th>courseId</th>
                {/*<th>location</th>*/}
                {/*<th>start</th>*/}
                {/*<th>end</th>*/}
                {/*<th></th>*/}
            </tr>
            </thead>
            <tbody>
            {registrationRows}
            </tbody>
        </table>)
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        getCourses: (username) => dispatch(fetchRegistrationCourses(username)),
        cancelRegistration: (id) => dispatch(cancelRegistration(id)),
        setUser: (username) => dispatch(selectUser(username)),
    }
}


function mapStateToProps(state, props) {
    return { ...state.registration,
        user: state.user.username}
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Registrations))