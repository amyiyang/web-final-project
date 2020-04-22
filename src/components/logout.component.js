import React from "react";
import {connect} from 'react-redux';
import {logOut} from '../studentActions/user.action'
import {Redirect} from "react-router";
import {Nav} from "react-bootstrap";

class LogoutContainer extends React.Component {
    onClick(event) {
        console.log('clicked event happened');
        event.preventDefault();
        this.props.login();
    }

    componentDidMount() {

    }

    render() {
        if (this.props.redirect === '/login') {
            return (<Redirect to={this.props.redirect}/>)
        }

        return (
            <Nav.Link onClick={(e) => this.onClick(e)}>Logout</Nav.Link>
            // <input type={'button'} value={'Logout'} onClick={(e) => this.onClick(e)}/>
        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        login: () => dispatch(logOut())
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
)(LogoutContainer)