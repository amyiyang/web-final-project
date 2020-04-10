import React from "react";
import {connect} from 'react-redux';
import {clear, register, validate} from '../studentActions/user.action'
import {Redirect} from "react-router";
import {BrowserRouter, Link} from "react-router-dom";


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
            <div> <Link to={'/login'}>Login</Link>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    {error}
                    <label>
                        Email:
                        <input type="text"
                               disabled={this.props.inFlight}
                               value={this.state.email}
                               onChange={(e) => this.handleChange(e, 'email')}/> </label>
                    <label>
                        Username:
                        <input type="text"
                               disabled={this.props.inFlight}
                               value={this.state.username}
                               onChange={(e) => this.handleChange(e, 'username')}/> </label>
                    <label> Password:
                        <input type="password"
                               disabled={this.props.inFlight}
                               value={this.state.password}
                               onChange={(e) => this.handleChange(e, 'password')}/> </label>
                    <label> Validate Password:
                        <input type="password"
                               disabled={this.props.inFlight}
                               value={this.state.validatePassword}
                               onChange={(e) => this.handleChange(e, 'validatePassword')}/> </label>
                    <input type="submit" value="Submit" disabled={this.props.inFlight}/>
                </form>
            </div>
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