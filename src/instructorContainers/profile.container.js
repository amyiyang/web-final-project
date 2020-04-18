import React from "react";
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {getInstructor} from "../instructorActions/user.action";
import {Link} from "react-router-dom";
import LogoutContainer from "../components/logout.component";

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
            return (<div>
                <LogoutContainer/>
                <Link to={'/instructor/courses'}> Courses </Link>
                <h1>email: {this.props.user.instructor._id}</h1>
                <h1>username: {this.props.user.instructor.username}</h1>
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