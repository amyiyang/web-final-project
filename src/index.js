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
import InstructorRegister from "./instructorContainers/register.container";
import Courses from "./studentContainers/courses.container"
import StudentProfile from "./studentContainers/profile.container"



const userStore = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={userStore}>
        <BrowserRouter>
            <Link to={'/login'}>Login</Link>&nbsp;
            <Link to={'/test'}>Register</Link>
            <Switch>
                <Route path="/user/:username/profile" component={StudentProfile}/>
                <Route path="/login" component={StudentLogin}/>
                {/*<Route paht="/login/instructor" component={InstructorLogin}/>*/}
                <Route path="/test" component={StudentRegister}/>
                {/*<Route path="/register/instructor" component={InstructorRegister}/>*/}
                {/*<Route path="/user/:username/pokemon" component={Pokemons}/>*/}
                <Route path="/user/:username/courses" component={Courses}/>
                <Redirect exact from="/" to="login"/>
            </Switch>
        </BrowserRouter>
    </Provider>,

    document.getElementById('root')
);