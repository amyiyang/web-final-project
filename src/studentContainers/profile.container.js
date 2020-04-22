import React from "react";
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {selectUser, getStudent} from "../studentActions/user.action";
import Registrations from "./registeredCourses.container";
import {fetchCourses, registerAClass} from "../studentActions/course.action";
import {Link} from "react-router-dom";
import LogoutContainer from "../components/logout.component";
import {Nav, Navbar, ListGroup, Container, Row, Col, Tab} from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        // const {match} = this.props;
        // const {username} = match.params;
        // this.props.setUser(username);
        this.props.getStudent();
    }

    render() {
        if ( this.props.loading === true) {
            return <h3>Loading...</h3>
        } else if (this.props.user.student !== null) {
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
                            <Nav.Link href={'/courses'}>Courses</Nav.Link>
                            <Nav.Link href={'/locations'}>Locations</Nav.Link>
                            <Nav.Link href={'/profile'} active>Profile</Nav.Link>
                            <LogoutContainer />
                            {/*<Nav.Link href={'/locations'}><LogoutContainer /></Nav.Link>*/}
                        </Nav>
                    </Navbar>
                    <div className="profile">
                    <Container>
                        <Row>
                            <Col lg={3} sm={0}></Col>
                            <Col lg={6} sm={0}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Email Address</Card.Title>
                                        <Card.Text>
                                            {this.props.user.student._id}
                                        </Card.Text>
                                        <Card.Title>Username</Card.Title>
                                        <Card.Text>
                                            {this.props.user.student.username}
                                        </Card.Text>
                                        <Card.Title>Available Credits</Card.Title>
                                        <Card.Text>
                                            {this.props.user.student.availableCredits}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={3} sm={0}></Col>
                        </Row>
                    </Container>
                    </div>


                    {/*<Card>*/}
                    {/*    <Card.Body>*/}
                    {/*        <Container>*/}
                    {/*            <Row>*/}
                    {/*                <Col lg={3} sm={0}></Col>*/}
                    {/*                <Col lg={6} sm={0}>*/}
                    {/*                    <ListGroup variant="flush">*/}
                    {/*                        <ListGroup.Item>Email Address: {this.props.user.student._id}</ListGroup.Item>*/}
                    {/*                        <ListGroup.Item>Username: {this.props.user.student.username}</ListGroup.Item>*/}
                    {/*                        <ListGroup.Item>Available Credits: {this.props.user.student.availableCredits}</ListGroup.Item>*/}
                    {/*                    </ListGroup>*/}
                    {/*                </Col>*/}
                    {/*                <Col lg={3} sm={0}></Col>*/}
                    {/*            </Row>*/}
                    {/*        </Container>*/}
                    {/*    </Card.Body>*/}
                    {/*</Card>*/}


                {/*<LogoutContainer/>*/}
                {/*<Link to={'/courses'}> Courses </Link>*/}

            </div>);
        } else {
            return (<div>
                {/*{this.props.user.map(student => <div>{student.username}</div>)}*/}
            </div>);
        }



    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        // getPokemon: (username) => dispatch(fetchPokemon(username)),
        // setUser: (username) => dispatch(selectUser(username)),
        getStudent: (username) => dispatch(getStudent())
    }
}


function mapStateToProps(state, props) {
    return {
        user: state.user,
        // username: state.user.username,
        // student: state.user.student
    }
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile))