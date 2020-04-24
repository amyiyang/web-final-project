import React from "react";
import {connect} from 'react-redux';
import {clear, login} from '../studentActions/user.action'
import {Redirect} from "react-router";
import {BrowserRouter, Link} from "react-router-dom";
import {Navbar, Form, Button, Container, Row, Col, Nav} from "react-bootstrap";
import '../css/style.css';
import Locations from "../studentContainers/locations.container"
import Carousel from "react-bootstrap/Carousel";


class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
    }

    // handleChange(event, value) {
    //     this.setState({[value]: event.target.value || ''});
    // }
    //
    // handleSubmit(event) {
    //     this.props.login(this.state);
    //     event.preventDefault();
    // }
    //
    // componentDidMount() {
    //     this.props.clear();
    //     this.setState({username: '', password: ''});
    // }

    render() {
        if (this.props.redirect) {
            return (<Redirect to={this.props.redirect}/>)
        }

        let error;
        if (this.props.error) {
            error = (<h3>{this.props.error.message}</h3>)
        }

        const instructorLogin = '/instructorLogin';

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
                        <Nav.Link href={'/landing'} active>Home</Nav.Link>
                        <Nav.Link href={'/locations'}>Locations</Nav.Link>
                        <Nav.Link href={'/login'}>Student Login</Nav.Link>
                        <Nav.Link href={'/instructorLogin'}>Instructor Login</Nav.Link>
                    </Nav>
                </Navbar>
                <div className="carousal">
                    <Carousel>
                        <Carousel.Item className="slide">
                            <img
                                className="d-block w-100"
                                src={require('../img/slide1.png')}
                                alt="First slide"
                            />
                            {/*<Carousel.Caption>*/}
                            {/*    <h3>The Largest Asian Dance Studio in Seattle</h3>*/}
                            {/*    <p>We offers Kpop, Jazz and Hiphop Classes</p>*/}
                            {/*</Carousel.Caption>*/}
                        </Carousel.Item>
                        <Carousel.Item className="slide">
                            <img
                                className="d-block w-100"
                                src={require('../img/slide2.png')}
                                alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                </div>
                {/*<Locations/>*/}
            </div>
        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {

    }
};


function mapStateToProps(state, props) {
    return {
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LandingPage)