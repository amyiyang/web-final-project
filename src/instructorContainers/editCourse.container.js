import React from "react";
import {connect} from 'react-redux';
import {Redirect} from "react-router";
import {Link} from "react-router-dom";
import {create, validate, updateCourse} from "../instructorActions/assignment.action";
import {getCourseById, getAssignmentByCourseId} from '../instructorActions/course.action'
import {Button, Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import LogoutContainer from "../components/logout.component";
import Form from "react-bootstrap/Form";

class EditCourseContainer extends React.Component {
    constructor(props) {
        super(props);
        const prefixLength = "/editClass/".length;
        const url = this.props.location.pathname;
        const length = url.length;
        const key = url.substring(prefixLength, length);
        console.log(key);
        this.props.requestACourse(key);
        this.props.requestAssignment(key);
        //console.dir(this.props.getACourse);
        //this.state = this.props.getACourse.getACourse;
        //console.dir(this.state);
        this.state = {instructor:'', id: key, capacity:'', location: '', startTime: '', endTime: ''};
        // this.state = {
        //     course: {id: key, capacity:'', location: '', startTime: '', endTime: ''},
        //     assignment: {instructorId: '', _id: '', courseId: ''}
        // };
    }

    // _renderCourseInfo() {
    //     this.props.requestACourse(this.state.id);
    //     console.dir(this.props.getACourse.getACourse);
    //     return this.props.getACourse.getACourse;
    //     //this.setState(course);
    //     //return this.props.getACourse.getACourse;
    // }

    handleChange(event, value) {
        // let change = {}
        // change[value] = e.target.value;
        // this.setState({course: change || ''});
        // console.dir(this.state)
        this.setState({[value]: event.target.value || ''});
    }

    // handleChangeInstructor(e, value) {
    //     let change = {}
    //     change[value] = e.target.value;
    //     this.setState({assignment: change || ''});
    //     //this.setState({assignment: {[value]: event.target.value || ''} || ''})
    //     console.dir(this.state)
    // }
    //
    handleSubmit(event) {
        console.dir(this.state);
        this.props.validate(this.state);
        //this.setState({assignment: {_id: assignment._id, courseId: assignment.courseId}});
        // if (!this.props.valid.success) {
        //     alert("Your input is invalid somewhere");
        // }
        console.log(this.props.valid.success);
        console.dir(this.state);
        event.preventDefault();
    }
    //
    // componentDidMount() {
    //     this.setState({
    //         instructor:'',
    //         id:'',
    //         capacity:'',
    //         location: '',
    //         startTime: '',
    //         endTime: '',
    //     })
    // }
    //
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.valid.success) {
            this.props.update(this.state);
        }
    }

    render() {
        if (this.props.redirect) {
            return (<Redirect to={this.props.redirect}/>)
        }

        // let error;
        // if (this.props.error || this.props.valid.message) {
        //     error = (<h3>{this.props.error || this.props.valid.message}</h3>)
        // }
        // const curCourse = this._renderCourseInfo();
        const course = this.props.getACourse.getACourse;
        const start = course.startTime + "";
        const end = course.endTime + "";
        const assignment = this.props.receiveAssignment;
        // console.dir(course);
        // console.dir(assignment);
        // this.setState({id: course._id, capacity:course.capacity, location: course.location,
        //     startTime: new Date(course.startTime), endTime: new Date(course.endTime)});
        //console.log(start.substr(0, start.length - 1));
        //console.dir(course);
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
                        <Nav.Link className="navItems" href={'/instructor/courses'}>Courses</Nav.Link>
                        <Nav.Link className="navItems" href={'/locations'}>Locations</Nav.Link>
                        <Nav.Link className="navItems" href={'/instructor/profile'}>Profile</Nav.Link>
                        <LogoutContainer />
                        {/*<Nav.Link href={'/locations'}><LogoutContainer /></Nav.Link>*/}
                    </Nav>
                </Navbar>

                <div id="createCourse">
                    <Container>
                        <Row>
                            <Col lg={3} sm={0}></Col>
                            <Col lg={6} sm={0}>
                                <Form onSubmit={(e) => this.handleSubmit(e)}>
                                    <Form.Group controlId="">
                                        <Form.Label>CourseID</Form.Label>
                                        <Form.Control type="text"
                                                      disabled={true}
                                                      value={this.state.id}
                                                      onChange={(e) => this.handleChange(e, 'id')}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Instructor's Email: {assignment.instructorId}</Form.Label>
                                        <Form.Control type="email" placeholder={'Enter new instructor email'}
                                                      disabled={this.props.inFlight}
                                                      value={this.state.instructor}
                                                      onChange={(e) => this.handleChange(e, 'instructor')}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="">
                                        <Form.Label>Capacity: {course.capacity}</Form.Label>
                                        <Form.Control type="text" placeholder={'Enter new capacity'}
                                                      disabled={this.props.inFlight}
                                                      value={this.state.capacity}
                                                      onChange={(e) => this.handleChange(e, 'capacity')}/>
                                    </Form.Group>

                                    <Form.Group controlId="">
                                        <Form.Label>Location: {course.location}</Form.Label>
                                        <Form.Control type="text" placeholder={'Enter new location'}
                                                      disabled={this.props.inFlight}
                                                      value={this.state.location}
                                                      onChange={(e) => this.handleChange(e, 'location')}/>
                                    </Form.Group>

                                    {/*<Form.Group>*/}
                                    {/*    <Form.Label>Location</Form.Label>*/}
                                    {/*    <Form.Control as="select"*/}
                                    {/*                    disabled={this.props.inFlight}*/}

                                    {/*                  onChange={(e) => this.handleChange(e, 'location')}>*/}
                                    {/*        <option value="Seattle">Seattle</option>*/}
                                    {/*        <option value="Redmond">Redmond</option>*/}
                                    {/*        </Form.Control>*/}
                                    {/*</Form.Group>*/}

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Start Time: {new Date(start).toUTCString()}</Form.Label>
                                        <Form.Control type="datetime-local"
                                                      disabled={this.props.inFlight}
                                                      value={this.state.startTime}
                                                      onChange={(e) => this.handleChange(e, 'startTime')}/>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>End Time: {new Date(end).toUTCString()}</Form.Label>
                                        <Form.Control type="datetime-local"
                                                      disabled={this.props.inFlight}
                                                      value={this.state.endTime}
                                                      onChange={(e) => this.handleChange(e, 'endTime')}/>
                                    </Form.Group>

                                    <Button variant="primary" type="submit" value="Update" disabled={this.props.inFlight}>
                                        Update
                                    </Button>
                                </Form>
                            </Col>
                            <Col lg={3} sm={0}></Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        create: (instructor, id, capacity, location,
                 startTime, endTime) => dispatch(create(instructor, id, capacity, location,
            startTime, endTime)),
        validate: (course) => dispatch(validate(course)),
        requestACourse: (id) => dispatch(getCourseById(id)),
        requestAssignment: (id) => dispatch(getAssignmentByCourseId(id)),
        update: (course) => dispatch(updateCourse(course))
    }
}


function mapStateToProps(state, props) {
    return {
        ...state.user,
        getACourse: state.course,
        receiveAssignment: state.course.getAssignment
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCourseContainer)