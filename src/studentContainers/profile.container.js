import React from "react";
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {selectUser, getStudent} from "../studentActions/user.action";
import Registrations from "./registeredCourses.container";
import {fetchCourses, registerAClass} from "../studentActions/course.action";

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        const {match} = this.props;
        const {username} = match.params;
        this.props.setUser(username);
        this.props.getStudent(username);
    }

    render() {
        if ( this.props.loading === true) {
            console.dir(this.props.user)
            return <h3>Loading...</h3>
        } else if (this.props.user.student !== null) {
            console.dir(this.props.student)
            return (<div>
                <h1>email: {this.props.user.student._id}</h1>
                <h1>username: {this.props.user.student.username}</h1>
                <h2>availableCredits: {this.props.user.student.availableCredits}</h2>
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
        getCourses: () => dispatch(fetchCourses()),
        setUser: (username) => dispatch(selectUser(username)),
        getStudent: (username) => dispatch(getStudent(username))
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