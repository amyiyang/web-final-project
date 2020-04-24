import React from "react";
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {getInstructor} from "../instructorActions/user.action";
import {Link} from "react-router-dom";
import LogoutContainer from "../components/logout.component";
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.getInstructor();
    }

    render() {
        if ( this.props.loading === true) {
            return <h3>Loading...</h3>
        } else if (this.props.user.instructor !== null) {
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
                            {/*<Nav.Link className="navItems" href={'/locations'}>Locations</Nav.Link>*/}
                            <Nav.Link className="navItems" href={'/instructor/profile'} active>Profile</Nav.Link>
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
                                                {this.props.user.instructor._id}
                                            </Card.Text>
                                            <Card.Title>Username</Card.Title>
                                            <Card.Text>
                                                {this.props.user.instructor.username}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col lg={3} sm={0}></Col>
                            </Row>
                        </Container>
                    </div>

                    {/*<LogoutContainer/>*/}
                    {/*<Link to={'/instructor/courses'}> Courses </Link>*/}
                    {/*<h1>email: {this.props.user.instructor._id}</h1>*/}
                    {/*<h1>username: {this.props.user.instructor.username}</h1>*/}
                </div>
            );
        } else {
            return (<div>
                {/*{this.props.user.map(student => <div>{student.username}</div>)}*/}
            </div>);
        }



    }
}

function mapDispatchToProps(dispatch, props) {
    return {

        getInstructor: () => dispatch(getInstructor())
    }
}


function mapStateToProps(state, props) {
    return {
        user: state.user,
    }
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile))