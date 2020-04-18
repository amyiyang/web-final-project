import React from "react";
import {connect} from 'react-redux';
import {Redirect} from "react-router";
import {Link} from "react-router-dom";
import {create, validate} from "../instructorActions/assignment.action";

class CreateCourseContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {instructor:'', id:'', capacity:'', location: '', startTime: '', endTime: ''};
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    handleSubmit(event) {
        this.props.validate(this.state);
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
            <div> <Link to={'/instructor/courses'}>Back</Link>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    {error}
                    <label>
                        Instructor email:
                        <input type="text"
                               disabled={this.props.inFlight}
                               value={this.state.instructor}
                               onChange={(e) => this.handleChange(e, 'instructor')}/> </label>
                    <label>
                        Course ID:
                        <input type="text"
                               disabled={this.props.inFlight}
                               value={this.state.id}
                               onChange={(e) => this.handleChange(e, 'id')}/> </label>
                    <label>
                        Capacity:
                        <input type="text"
                               disabled={this.props.inFlight}
                               value={this.state.capacity}
                               onChange={(e) => this.handleChange(e, 'capacity')}/> </label>
                    <label>
                        Location:
                        <input type="text"
                               disabled={this.props.inFlight}
                               value={this.state.location}
                               onChange={(e) => this.handleChange(e, 'location')}/> </label>
                    <label>
                        Start Time:
                        <input type="datetime-local"
                               disabled={this.props.inFlight}
                               value={this.state.startTime}
                               onChange={(e) => this.handleChange(e, 'startTime')}/> </label>
                    <label>
                        End Time:
                        <input type="datetime-local"
                               disabled={this.props.inFlight}
                               value={this.state.endTime}
                               onChange={(e) => this.handleChange(e, 'endTime')}/> </label>
                    <input type="submit" value="Submit" disabled={this.props.inFlight}/>
                </form>
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