import React from "react";
import {connect} from 'react-redux';
import {clear, register, validate} from '../studentActions/user.action'
import {Redirect} from "react-router";
import {BrowserRouter, Link} from "react-router-dom";
import {Button, Col, Container, Form, Nav, Navbar, Row} from "react-bootstrap";


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email:'', username: '', password: '', validatePassword: ''};
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    handleSubmit(event) {
        this.props.validate(this.state);
        event.preventDefault();
    }

    componentDidMount() {
        this.props.clear();
        this.setState({
            email:'',
            username: '',
            password: '',
            validatePassword: '',
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.valid.success) {
            this.props.register(this.state.email, this.state.username, this.state.password);
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
                        {/*<img*/}
                        {/*    alt=""*/}
                        {/*    src={require('../img/whiteLogo.png')}*/}
                        {/*    width="30%"*/}
                        {/*    height="30%"*/}
                        {/*    className="d-inline-block align-top"*/}
                        {/*/>*/}
                    </Navbar.Brand>
                    <Nav className="justify-content-end"  display="flex">
                        <Nav.Link href={'/locations'}>Locations</Nav.Link>
                        <Nav.Link href={'/instructorLogin'}>Instructor Login</Nav.Link>
                    </Nav>
                </Navbar>

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
                                    <Form.Group controlId="formBasicEmail" onSubmit={(e) => this.handleSubmit(e)}>
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter Email Address"
                                                      disabled={this.props.inFlight}
                                                      value={this.state.email}
                                                      onChange={(e) => this.handleChange(e, 'email')}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail" onSubmit={(e) => this.handleSubmit(e)}>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Username"
                                                      disabled={this.props.inFlight}
                                                      value={this.state.username}
                                                      onChange={(e) => this.handleChange(e, 'username')}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter Password"
                                                      disabled={this.props.inFlight}
                                                      value={this.state.password}
                                                      onChange={(e) => this.handleChange(e, 'password')}/>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Validate Password</Form.Label>
                                        <Form.Control type="password" placeholder="Re-enter Password"
                                                      disabled={this.props.inFlight}
                                                      value={this.state.validatePassword}
                                                      onChange={(e) => this.handleChange(e, 'validatePassword')}/>
                                    </Form.Group>

                                    <Button variant="primary" type="submit" value="Submit" disabled={this.props.inFlight}>
                                        Register
                                    </Button>
                                </Form>
                            </Col>
                            <Col lg={3} sm={0}></Col>
                        </Row>
                        <Row>
                            <Col lg={3} sm={0}></Col>
                            <Col lg={6} sm={0}>
                                <Button variant="link" href={'/login'}>
                                    Already have an account? Login
                                </Button>
                            </Col>
                            <Col lg={3} sm={0}></Col>
                        </Row>
                    </Container>
                </div>
            </div>

        // <div>
        //     <Link to={'/login'}>Login</Link>
        //         <form onSubmit={(e) => this.handleSubmit(e)}>
        //             {error}
        //             <label>
        //                 Email:
        //                 <input type="text"
        //                        disabled={this.props.inFlight}
        //                        value={this.state.email}
        //                        onChange={(e) => this.handleChange(e, 'email')}/> </label>
        //             <label>
        //                 Username:
        //                 <input type="text"
        //                        disabled={this.props.inFlight}
        //                        value={this.state.username}
        //                        onChange={(e) => this.handleChange(e, 'username')}/> </label>
        //             <label> Password:
        //                 <input type="password"
        //                        disabled={this.props.inFlight}
        //                        value={this.state.password}
        //                        onChange={(e) => this.handleChange(e, 'password')}/> </label>
        //             <label> Validate Password:
        //                 <input type="password"
        //                        disabled={this.props.inFlight}
        //                        value={this.state.validatePassword}
        //                        onChange={(e) => this.handleChange(e, 'validatePassword')}/> </label>
        //             <input type="submit" value="Submit" disabled={this.props.inFlight}/>
        //         </form>
        //     </div>
        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        register: (email, username, password) => dispatch(register(email, username, password)),
        clear: () => dispatch(clear()),
        validate: (user) => dispatch(validate(user)),
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
)(Register)