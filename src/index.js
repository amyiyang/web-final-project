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
import InstructorCourses from "./instructorContainers/courses.container"




const userStore = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={userStore}>
        <BrowserRouter>
            <Link to={'/locations'}>Locations</Link>
            <Switch>
                <Route path="/login" component={StudentLogin}/>
                <Redirect exact from="/" to="login"/>
                <Route path="/locations" component={Locations}/>
                <Route path="/test" component={StudentRegister}/>
                <Route path="/user/:username/courses" component={Courses}/>
                <Route path="/user/:username/profile" component={StudentProfile}/>
                <Route path="/instructorLogin" component={InstructorLogin}/>
                <Route path="/instructor/:username/courses" component={InstructorCourses}/>
            </Switch>
        </BrowserRouter>
    </Provider>,

    document.getElementById('root')
);