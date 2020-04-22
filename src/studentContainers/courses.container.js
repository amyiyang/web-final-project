import React from "react";
import {connect} from 'react-redux';
import {fetchCourses, registerAClass} from '../studentActions/course.action'
// import {addPokemon, deletePokemon, fetchPokemon} from '../studentActions/pokemon.action'
import {Redirect, withRouter} from "react-router";
import {selectUser, getStudent} from "../studentActions/user.action";
import Registrations from "./registeredCourses.container";
import {Link} from "react-router-dom";
import LogoutContainer from "../components/logout.component";
import {Nav, Navbar, Container, Row, Col, Form, Table} from "react-bootstrap";

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

        return (
            <div>
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
                        <Nav.Link className="navItems" href={'/courses'} active>Courses</Nav.Link>
                        <Nav.Link className="navItems" href={'/locations'}>Locations</Nav.Link>
                        <Nav.Link className="navItems" href={'/profile'}>Profile</Nav.Link>
                        <LogoutContainer />
                        {/*<Nav.Link href={'/locations'}><LogoutContainer /></Nav.Link>*/}
                    </Nav>
                </Navbar>
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
                    <hr />
                    <Row>
                        <Col lg={1} sm={0}></Col>
                        <Col lg={10} sm={12}>
                            {this._availableCredits()}
                        </Col>
                        <Col lg={1} sm={0}></Col>
                    </Row>
                    <hr />
                    <div className="table">
                    <Row>
                        <Col lg={1} sm={0}></Col>
                        <Col lg={10} sm={12}>
                            <h2>Registered Courses: </h2>
                            <Registrations />
                        </Col>
                        <Col lg={1} sm={0}></Col>
                    </Row>
                    </div>
                </Container>
                {/*<LogoutContainer/>*/}
                {/*<Link to={profileLink}> Profile </Link>*/}
                {/*<h1>These are courses!</h1>*/}
                {/*<div>{this._renderCourseList()}</div>*/}
                {/*<div>{this._availableCredits()}</div>*/}
                {/*<Registrations/>*/}

            </div>
        );
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
            return <h2>Available Credits: {this.props.user.student.availableCredits}</h2>
        } else {
            return '';
        }
    }

    _renderCourseList() {
        const courses = this.props.courses;
        if (courses.length === 0) {
            return (
                <div>There are no available courses yet</div>
            )
        }
        const sorted = courses.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
        // console.dir(sorted);
        const coursesRows = sorted.map(course => (
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
        return (<Table striped size="sm" bordered responsive>
            <thead>
            <tr>
                <th>CourseID</th>
                <th>Capacity</th>
                <th>Location</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {coursesRows}
            </tbody>
        </Table>)
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