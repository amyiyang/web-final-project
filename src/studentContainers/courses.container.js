import React from "react";
import {connect} from 'react-redux';
import {fetchCourses, registerAClass} from '../studentActions/course.action'
// import {addPokemon, deletePokemon, fetchPokemon} from '../studentActions/pokemon.action'
import {Redirect, withRouter} from "react-router";
import {selectUser, getStudent} from "../studentActions/user.action";
import Registrations from "./registeredCourses.container";
import {Link} from "react-router-dom";
import LogoutContainer from "../components/logout.component";

class Courses extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.getCourses();
        this.props.getStudent();
    }

    render() {
        if (this.props.loading) {
            return <h3>Loading...</h3>
        }

        const profileLink = '/profile';
        console.dir(this.props.user);

        return (<div>
            <LogoutContainer/>
            <Link to={profileLink}> Profile </Link>
            <h1>These are courses!</h1>
            <div>{this._renderCourseList()}</div>
            <div>{this._availableCredits()}</div>
            <Registrations/>

        </div>);
    }

    _registerAClass(id) {
        this.props.registerAClass(id, this.props.user.student.availableCredits)
    }

    _isRegistered(courseId) {
        for(let i = 0; i < this.props.registration.registration.length; i++){
            let course = this.props.registration.registration[i];
            if(course.courseId === courseId) {
                return true;
            }
        }
        return false;
    }

    _availableCredits() {
        if ( this.props.loading === true) {
            return (<h3>Loading...</h3>)
        } else if (this.props.user.student !== null) {
            return <h2>available Credits: {this.props.user.student.availableCredits}</h2>
        } else {
            return '';
        }
    }
    _renderCourseList() {
        const coursesRows = this.props.courses.map(course => (
            <tr key={course._id}>
                <td>{course._id}</td>
                <td>{course.capacity}</td>
                <td>{course.location}</td>
                <td>{new Date(course.startTime).toUTCString()}</td>
                <td>{new Date(course.endTime).toUTCString()}</td>
                <td><input type='button' value='Register'
                           disabled={this._isRegistered(course._id) ||
                           (this.props.user.student !== null && this.props.user.student.availableCredits === 0)}
                           onClick={() => this._registerAClass(course._id)}/> </td>
            </tr>));
        return (<table>
            <thead>
            <tr>
                <th>id</th>
                <th>capacity</th>
                <th>location</th>
                <th>start</th>
                <th>end</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {coursesRows}
            {/*<tr key={'input'}>*/}
            {/*    <td><input type={'text'} value={this.state.name} onChange={e => this._handleFormUpdate(e, 'name')}/></td>*/}
            {/*    <td><input type={'date'} value={this.state.birthday} onChange={e => this._handleFormUpdate(e, 'birthday')}/></td>*/}
            {/*    <td><input type={'number'} value={this.state.health} onChange={e => this._handleFormUpdate(e, 'health')}/></td>*/}
            {/*    <td><input type='button' value='Add' onClick={() => this._addPokemon()}/> </td>*/}
            {/*</tr>*/}
            </tbody>
        </table>)
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        getCourses: () => dispatch(fetchCourses()),
        registerAClass: (courseId, currentCredit) =>
            dispatch(registerAClass(courseId, currentCredit)),
        getStudent: () => dispatch(getStudent())
    }
}


function mapStateToProps(state, props) {
    return { ...state.course,
        username: state.user.username,
        registration: state.registration,
        user: state.user,
    }
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Courses))