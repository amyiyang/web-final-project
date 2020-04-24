import React from "react";
import {connect} from 'react-redux';
import {clear, login} from '../instructorActions/user.action'
import {Redirect} from "react-router";
import {Link} from "react-router-dom";
import {Button, Col, Container, Form, Nav, Navbar, Row} from "react-bootstrap";

class InstructorLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    handleSubmit(event) {
        this.props.login(this.state);
        event.preventDefault();
    }

    componentDidMount() {
        this.props.clear();
        this.setState({username: '', password: ''});
    }

    render() {
        if (this.props.redirect) {
            return (<Redirect to={this.props.redirect}/>)
        }

        let error;
        if (this.props.error) {
            error = (<h3>{this.props.error.message}</h3>)
        }

        return (
            <div>
                <Navbar bg="dark" variant="dark" sticky="top">
                    <Navbar.Brand href='/'>
                        {/*<img*/}
                        {/*    alt=""*/}
                        {/*    src={require('../img/whiteLogo.png')}*/}
                        {/*    width="30%"*/}
                        {/*    height="30%"*/}
                        {/*    className="d-inline-block align-top"*/}
                        {/*/>*/}
                    </Navbar.Brand>
                    <Nav className="justify-content-end"  display="flex">
                        <Nav.Link href={'/landing'}>Home</Nav.Link>
                        <Nav.Link href={'/login'}>Student Login</Nav.Link>
                        <Nav.Link href={'/instructorLogin'} active>Instructor Login</Nav.Link>
                        {/*<Nav.Link href={'/locations'}>Locations</Nav.Link>*/}
                    </Nav>
                </Navbar>

                {/*<Link to={'/register'}>Register</Link>*/}
                {/*<Link to={'/locations'}>Locations</Link>*/}
                <div className="loginForm">
                    <Container>
                        <Row>
                            <Col lg={3} sm={0}></Col>
                            <Col lg={6} sm={0}>
                                <img className="img-responsive" src={require('../img/logo.png')}
                                     width="400px"/>
                            </Col>
                            <Col lg={3} sm={0}></Col>
                        </Row>
                        <Row>
                            <Col lg={3} sm={0}></Col>
                            <Col lg={6} sm={12}>
                                <Form onSubmit={(e) => this.handleSubmit(e)}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Instructor Username</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Username"
                                                      disabled={this.props.inFlight}
                                                      value={this.state.username}
                                                      onChange={(e) => this.handleChange(e, 'username')}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password"
                                                      disabled={this.props.inFlight}
                                                      value={this.state.password}
                                                      onChange={(e) => this.handleChange(e, 'password')}/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" value="Submit" disabled={this.props.inFlight}>
                                        Login as Instructor
                                    </Button>

                                </Form>
                            </Col>
                            <Col lg={3} sm={0}></Col>
                        </Row>
                    </Container>
                </div>
            </div>


            //
            // <form onSubmit={(e) => this.handleSubmit(e)}>
            //     <h2> Instructor Login</h2>
            //     {error}
            //     <label>
            //         Name:
            //         <input type="text"
            //                disabled={this.props.inFlight}
            //                value={this.state.username}
            //                onChange={(e) => this.handleChange(e, 'username')}/> </label>
            //     <label> Password:
            //         <input type="password"
            //                disabled={this.props.inFlight}
            //                value={this.state.password}
            //                onChange={(e) => this.handleChange(e, 'password')}/> </label>
            //     <input type="submit" value="Submit" disabled={this.props.inFlight}/>
            // </form>
            //     <Link to={'/login'}>Student Login</Link>

        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        login: (user) => dispatch(login(user)),
        clear: () => dispatch(clear()),
    }
};


function mapStateToProps(state, props) {
    return {
        ...state.user,
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InstructorLogin)