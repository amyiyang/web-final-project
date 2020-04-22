import React from "react";
import {connect} from 'react-redux';
import {Redirect} from "react-router";
import {Link} from "react-router-dom";
import {create, validate} from "../instructorActions/assignment.action";
import {Button, Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import LogoutContainer from "../components/logout.component";
import Form from "react-bootstrap/Form";

class CreateCourseContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {instructor:'', id:'', capacity:'', location: '', startTime: '', endTime: ''};
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    handleSubmit(event) {
        console.dir(this.state);
        this.props.validate(this.state);
        // if (!this.props.valid.success) {
        //     alert("Your input is invalid somewhere");
        // }
        console.log(this.props.valid.success);
        event.preventDefault();
    }

    componentDidMount() {
        this.setState({
            instructor:'',
            id:'',
            capacity:'',
            location: '',
            startTime: '',
            endTime: '',
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.valid.success) {
            this.props.create(this.state.instructor, this.state.id, this.state.capacity, this.state.location,
                this.state.startTime, this.state.endTime);
        }
    }

    render() {

        if (this.props.redirect) {
            return (<Redirect to={this.props.redirect}/>)
        }

        let error;
        if (this.props.error || this.props.valid.message) {
            error = (<h3>{this.props.error || this.props.valid.message}</h3>)
        }

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
                                    <Form.Group controlId="formBasicEmail" onSubmit={(e) => this.handleSubmit(e)}>
                                        <Form.Label>Instructor's Email</Form.Label>
                                        <Form.Control type="email" placeholder="Enter Instructor's Email"
                                                      disabled={this.props.inFlight}
                                                      value={this.state.instructor}
                                                      onChange={(e) => this.handleChange(e, 'instructor')}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail" onSubmit={(e) => this.handleSubmit(e)}>
                                        <Form.Label>CourseID</Form.Label>
                                        <Form.Control type="text" placeholder="Enter CourseID"
                                                      disabled={this.props.inFlight}
                                                      value={this.state.id}
                                                      onChange={(e) => this.handleChange(e, 'id')}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Capacity</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Capacity"
                                                      disabled={this.props.inFlight}
                                                      value={this.state.capacity}
                                                      onChange={(e) => this.handleChange(e, 'capacity')}/>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Location"
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
                                        <Form.Label>Start Time</Form.Label>
                                        <Form.Control type="datetime-local"
                                                      disabled={this.props.inFlight}
                                                      value={this.state.startTime}
                                                      onChange={(e) => this.handleChange(e, 'startTime')}/>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>End Time</Form.Label>
                                        <Form.Control type="datetime-local"
                                                      disabled={this.props.inFlight}
                                                      value={this.state.endTime}
                                                      onChange={(e) => this.handleChange(e, 'endTime')}/>
                                    </Form.Group>

                                    <Button variant="primary" type="submit" value="Submit" disabled={this.props.inFlight}>
                                        Create
                                    </Button>
                                </Form>
                            </Col>
                            <Col lg={3} sm={0}></Col>
                        </Row>
                    </Container>
                </div>
                {/*<Form onSubmit={(e) => this.handleSubmit(e)}>*/}
                {/*    <Form.Group controlId="formBasicEmail" onSubmit={(e) => this.handleSubmit(e)}>*/}
                {/*        <Form.Label>Instructor's Email</Form.Label>*/}
                {/*        <Form.Control type="email" placeholder="Enter Instructor's Email"*/}
                {/*                      disabled={this.props.inFlight}*/}
                {/*                      value={this.state.instructor}*/}
                {/*                      onChange={(e) => this.handleChange(e, 'instructor')}*/}
                {/*        />*/}
                {/*    </Form.Group>*/}

                {/*    <Form.Group controlId="formBasicEmail" onSubmit={(e) => this.handleSubmit(e)}>*/}
                {/*        <Form.Label>CourseID</Form.Label>*/}
                {/*        <Form.Control type="text" placeholder="Enter CourseID"*/}
                {/*                      disabled={this.props.inFlight}*/}
                {/*                      value={this.state.id}*/}
                {/*                      onChange={(e) => this.handleChange(e, 'id')}*/}
                {/*        />*/}
                {/*    </Form.Group>*/}

                {/*    <Form.Group controlId="formBasicPassword">*/}
                {/*        <Form.Label>Capacity</Form.Label>*/}
                {/*        <Form.Control type="text" placeholder="Enter Capacity"*/}
                {/*                      disabled={this.props.inFlight}*/}
                {/*                      value={this.state.capacity}*/}
                {/*                      onChange={(e) => this.handleChange(e, 'capacity')}/>*/}
                {/*    </Form.Group>*/}

                {/*    <Form.Group controlId="formBasicPassword">*/}
                {/*        <Form.Label>Location</Form.Label>*/}
                {/*        <Form.Control disabled={this.props.inFlight}*/}
                {/*                      value={this.state.location}*/}
                {/*                      onChange={(e) => this.handleChange(e, 'location')}/>*/}
                {/*    </Form.Group>*/}

                {/*    <Form.Group controlId="formBasicPassword">*/}
                {/*        <Form.Label>Start Time</Form.Label>*/}
                {/*        <Form.Control type="datetime-local"*/}
                {/*                      disabled={this.props.inFlight}*/}
                {/*                      value={this.state.startTime}*/}
                {/*                      onChange={(e) => this.handleChange(e, 'startTime')}/>*/}
                {/*    </Form.Group>*/}

                {/*    <Form.Group controlId="formBasicPassword">*/}
                {/*        <Form.Label>End Time</Form.Label>*/}
                {/*        <Form.Control type="datetime-local"*/}
                {/*                      disabled={this.props.inFlight}*/}
                {/*                      value={this.state.endTime}*/}
                {/*                      onChange={(e) => this.handleChange(e, 'endTime')}/>*/}
                {/*    </Form.Group>*/}

                {/*    <Button variant="primary" type="submit" value="Submit" disabled={this.props.inFlight}>*/}
                {/*        Create*/}
                {/*    </Button>*/}
                {/*</Form>*/}

                {/*<Link to={'/instructor/courses'}>Back</Link>*/}
                {/*<Form onSubmit={(e) => this.handleSubmit(e)}>*/}
                {/*    {error}*/}
                {/*    <label>*/}
                {/*        Instructor email:*/}
                {/*        <input type="text"*/}
                {/*               disabled={this.props.inFlight}*/}
                {/*               value={this.state.instructor}*/}
                {/*               onChange={(e) => this.handleChange(e, 'instructor')}/> </label>*/}
                {/*    <label>*/}
                {/*        Course ID:*/}
                {/*        <input type="text"*/}
                {/*               disabled={this.props.inFlight}*/}
                {/*               value={this.state.id}*/}
                {/*               onChange={(e) => this.handleChange(e, 'id')}/> </label>*/}
                {/*    <label>*/}
                {/*        Capacity:*/}
                {/*        <input type="text"*/}
                {/*               disabled={this.props.inFlight}*/}
                {/*               value={this.state.capacity}*/}
                {/*               onChange={(e) => this.handleChange(e, 'capacity')}/> </label>*/}
                {/*    <label>*/}
                {/*        Location:*/}
                {/*        <input type="text"*/}
                {/*               disabled={this.props.inFlight}*/}
                {/*               value={this.state.location}*/}
                {/*               onChange={(e) => this.handleChange(e, 'location')}/> </label>*/}
                {/*    <label>*/}
                {/*        Start Time:*/}
                {/*        <input type="datetime-local"*/}
                {/*               disabled={this.props.inFlight}*/}
                {/*               value={this.state.startTime}*/}
                {/*               onChange={(e) => this.handleChange(e, 'startTime')}/> </label>*/}
                {/*    <label>*/}
                {/*        End Time:*/}
                {/*        <input type="datetime-local"*/}
                {/*               disabled={this.props.inFlight}*/}
                {/*               value={this.state.endTime}*/}
                {/*               onChange={(e) => this.handleChange(e, 'endTime')}/> </label>*/}
                {/*    <input type="submit" value="Submit" disabled={this.props.inFlight}/>*/}
                {/*</Form>*/}
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
    }
}


function mapStateToProps(state, props) {
    return {
        ...state.user,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateCourseContainer)