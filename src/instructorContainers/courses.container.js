import React from "react";
import {connect} from 'react-redux';
import {deleteClass, fetchCoursesAndAssignment} from '../instructorActions/assignment.action'
import {getRegistrationByCourseId} from "../instructorActions/course.action";
// import {addPokemon, deletePokemon, fetchPokemon} from '../studentActions/pokemon.action'
import {Redirect, withRouter} from "react-router";
import {selectUser} from "../studentActions/user.action";
import {Link} from "react-router-dom";
import LogoutContainer from "../components/logout.component";
import {Button, Col, Nav, Navbar, Row, Table} from "react-bootstrap";
import Container from "react-bootstrap/Container";

class Courses extends React.Component {
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

        const profileLink = '/instructor/profile';
        return (
            <div>
                <div>{this._getCourseRegistrations("5")}</div>
                <Navbar bg="dark" variant="dark" sticky="top">
                    <Navbar.Brand href='/'>
                        <img
                            alt=""
                            src={require('../img/whiteLogo.png')}
                            width="30%"
                            height="30%"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Nav className="justify-content-end"  display="flex">
                        <Nav.Link className="navItems" href={'/instructor/courses'} active>Courses</Nav.Link>
                        <Nav.Link className="navItems" href={'/locations'}>Locations</Nav.Link>
                        <Nav.Link className="navItems" href={'/instructor/profile'}>Profile</Nav.Link>
                        <LogoutContainer />
                        {/*<Nav.Link href={'/locations'}><LogoutContainer /></Nav.Link>*/}
                    </Nav>
                </Navbar>
                {/*<LogoutContainer/>*/}
                {/*<Link to={profileLink}> Profile </Link>*/}
                <Container>
                    <div className="table">
                        <Row>
                            <Col lg={1} sm={0}></Col>
                            <Col lg={10} sm={12}>
                                <h2>All Courses: </h2>
                                {this._renderCourseList()}
                            </Col>
                            <Col lg={1} sm={0}></Col>
                        </Row>
                    </div>
                    <Row>
                        <Col lg={1} sm={0}></Col>
                        <Col lg={10} sm={12}>
                            <Button href={'/creatNewClass'}>Create a New Course</Button>
                        </Col>
                        <Col lg={1} sm={0}></Col>
                    </Row>
                </Container>
                {/*<Link to={'/creatNewClass'}>*/}
                {/*    <button> Create a new class</button>*/}
                {/*</Link>*/}
                {/*<h1>These are courses!</h1>*/}
                {/*<div>{this._renderCourseList()}</div>*/}
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

        const sorted = rows.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
        const coursesRows = sorted.map(course => (
            <tr key={course._id}>
                <td>{course._id}</td>
                <td>{course.capacity}</td>
                <td>{course.location}</td>
                <td>{course.instructor}</td>
                <td>{new Date(course.startTime).toUTCString()}</td>
                <td>{new Date(course.endTime).toUTCString()}</td>
                <td><input type='button' value='delete'

                           onClick={() => this._deleteAClass(course._id)}/> </td>
                {/*<td>{this._getCourseRegistrations(course._id)}</td>*/}
            </tr>));

        return (<Table striped size="sm" bordered responsive>
            <thead>
            <tr>
                <th>CourseID</th>
                <th>Capacity</th>
                <th>Location</th>
                <th>Instructor</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th></th>
                <th>Num of Students</th>
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
        </Table>)
    }

    _deleteAClass(_id) {
        this.props.deleteAClass(_id);
    }

    _getCourseRegistrations(id) {
        this.props.getCourseRegistration(id);
        return this.props.courseRegistrations.length;
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        getCourses: () => dispatch(fetchCoursesAndAssignment()),
        deleteAClass: (id) => dispatch(deleteClass(id)),
        getCourseRegistration: (id) => dispatch(getRegistrationByCourseId(id))
    }
}


function mapStateToProps(state, props) {
    return {
        username: state.user.username,
        registration: state.registration.registration,
        assignment: state.assignment.assignment,
        allCourses: state.course.courses,
        courseRegistrations: state.course.registrations
    }
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Courses))