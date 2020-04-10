import React from "react";
import {connect} from 'react-redux';
import {fetchCoursesAndAssignment} from '../instructorActions/assignment.action'
// import {addPokemon, deletePokemon, fetchPokemon} from '../studentActions/pokemon.action'
import {Redirect, withRouter} from "react-router";
import {selectUser} from "../studentActions/user.action";
import {Link} from "react-router-dom";

class Courses extends React.Component {
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

        const profileLink = '/user/' + this.props.username + '/profile';
        return (<div>
            <Link to={profileLink}> Profile </Link>
            <h1>These are courses!</h1>
            <div>{this._renderCourseList()}</div>
            <button> Create a new class</button>
        </div>);
    }





    _renderCourseList() {
        // console.dir(this.props.registration);
        console.dir(this.props.assignment);
        console.dir(this.props.allCourses);
        let assignments = this.props.assignment;
        let rows = this.props.allCourses
        //add instructor
        for (let i = 0; i < rows.length; i++) {
            for(let j=0; j< assignments.length; j++) {
                console.log(i, j);
                console.log(rows[i]._id);
                console.log(assignments[j].courseId);
                if(rows[i]._id === assignments[j].courseId) {
                    console.log("true");
                    rows[i].instructor = assignments[j].instructorId;
                }
            }
        }
        console.log(rows);

        const coursesRows = rows.map(course => (
            <tr key={course._id}>
                <td>{course._id}</td>
                <td>{course.capacity}</td>
                <td>{course.location}</td>
                <td>{course.instructor}</td>
                <td>{new Date(course.startTime).toUTCString()}</td>
                <td>{new Date(course.endTime).toUTCString()}</td>
            </tr>));



        return (<table>
            <thead>
            <tr>
                <th>id</th>
                <th>capacity</th>
                <th>location</th>
                <th>instructor</th>
                <th>start</th>
                <th>end</th>
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
        // getPokemon: (username) => dispatch(fetchPokemon(username)),
        getCourses: (instructorId) => dispatch(fetchCoursesAndAssignment(instructorId)),
        // registerAClass: (courseId, username) => dispatch(registerAClass(courseId, username)),
        // addPokemon: (pokemon, username) => dispatch(addPokemon(pokemon, username)),
        // deletePokemon: (id, username) => dispatch(deletePokemon(id, username)),
        setUser: (username) => dispatch(selectUser(username)),
    }
}


function mapStateToProps(state, props) {
    return {
        username: state.user.username,
        registration: state.registration.registration,
        assignment: state.assignment.assignment,
        allCourses: state.course.courses
    }
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Courses))