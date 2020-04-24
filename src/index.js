import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducers from './reducers';
import thunkMiddleware from 'redux-thunk';
import {
    BrowserRouter, Switch,
    Route, Redirect, Link
} from "react-router-dom";
import StudentLogin from "./studentContainers/login.container";
import InstructorLogin from "./instructorContainers/login.container"
import Pokemons from "./studentContainers/courses.container";
import StudentRegister from "./studentContainers/register.container";
import Courses from "./studentContainers/courses.container"
import StudentProfile from "./studentContainers/profile.container"
import Locations from "./studentContainers/locations.container";
import 'bootstrap/dist/css/bootstrap.min.css';
import InstructorCourses from "./instructorContainers/courses.container";
import LoggedInComponent from "./components/loggedin.component";
import InstructorProfile from "./instructorContainers/profile.container"
import CreatNewClass from "./instructorContainers/createCourse.container"
import EditCourse from "./instructorContainers/editCourse.container";
import LandingPage from "./landing/landing.container"
const userStore = createStore(reducers, applyMiddleware(thunkMiddleware));



ReactDOM.render(
    <Provider store={userStore}>
        <BrowserRouter>
            {/*<Link to={'/locations'}>Locations</Link>*/}
            <Switch>
                <Route path="/login" component={StudentLogin}/>
                <Route path="/landing" component={LandingPage}/>
                <Redirect exact from="/" to="/landing"/>
                <Route path="/locations" component={Locations}/>
                <Route path="/register" component={StudentRegister}/>
                <Route path="/courses" component={LoggedInComponent(Courses)}/>
                <Route path="/profile" component={LoggedInComponent(StudentProfile)}/>
                <Route path="/instructorLogin" component={InstructorLogin}/>
                <Route path="/instructor/courses" component={LoggedInComponent(InstructorCourses)}/>
                <Route path="/instructor/profile" component={LoggedInComponent(InstructorProfile)}/>
                <Route path="/creatNewClass" component={LoggedInComponent(CreatNewClass)}/>
                <Route path="/editClass/:id" component={LoggedInComponent(EditCourse)}/>
                {/*<Route path="/editClass/:id" component={EditCourse}/>*/}
            </Switch>
        </BrowserRouter>
    </Provider>,

    document.getElementById('root')
);