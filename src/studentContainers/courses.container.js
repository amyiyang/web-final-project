// import React from "react";
// import {connect} from 'react-redux';
// import {addPokemon, deletePokemon, fetchPokemon} from '../studentActions/pokemon.action'
// import {withRouter} from "react-router";
// import {selectUser} from "../studentActions/user.action";
//
// class Pokemons extends React.Component {
//     constructor() {
//         super();
//         this.state = {};
//     }
//
//     componentDidMount() {
//         const { match } = this.props;
//         const { username } = match.params;
//         this.props.setUser(username);
//         this.props.getPokemon(username);
//     }
//
//     render() {
//         if (this.props.loading) {
//             return <h3>Loading...</h3>
//         }
//
//         return (<div>
//             <h1>These are my Pokemon!</h1>
//             <div>{this._renderPokemonList()}</div>
//         </div>);
//     }
//
//     _deletePokemon(id) {
//         this.props.deletePokemon(id, this.props.username);
//     }
//
//     _addPokemon() {
//         this.props.addPokemon(this.state, this.props.username);
//     }
//
//     _handleFormUpdate(event, value) {
//         this.setState({
//             [value]: event.target.value || '',
//         })
//     }
//
//     _renderPokemonList() {
//         const pokemonRows = this.props.pokemons.map(pokemon => (
//             <tr key={pokemon._id}>
//                 <td>{pokemon.name}</td>
//                 <td>{new Date(pokemon.birthday).toDateString()}</td>
//                 <td>{pokemon.health}</td>
//                 <td><input type='button' value='Delete' onClick={() => this._deletePokemon(pokemon._id)}/> </td>
//             </tr>));
//         return (<table>
//             <thead>
//             <tr>
//                 <th>Name</th>
//                 <th>Birthday</th>
//                 <th>Health</th>
//                 <th></th>
//             </tr>
//             </thead>
//             <tbody>
//             {pokemonRows}
//             <tr key={'input'}>
//                 <td><input type={'text'} value={this.state.name} onChange={e => this._handleFormUpdate(e, 'name')}/></td>
//                 <td><input type={'date'} value={this.state.birthday} onChange={e => this._handleFormUpdate(e, 'birthday')}/></td>
//                 <td><input type={'number'} value={this.state.health} onChange={e => this._handleFormUpdate(e, 'health')}/></td>
//                 <td><input type='button' value='Add' onClick={() => this._addPokemon()}/> </td>
//             </tr>
//             </tbody>
//         </table>)
//     }
// }
//
//
// function mapDispatchToProps(dispatch, props) {
//     return {
//         getPokemon: (username) => dispatch(fetchPokemon(username)),
//         addPokemon: (pokemon, username) => dispatch(addPokemon(pokemon, username)),
//         deletePokemon: (id, username) => dispatch(deletePokemon(id, username)),
//         setUser: (username) => dispatch(selectUser(username)),
//     }
// }
//
//
// function mapStateToProps(state, props) {
//     return { ...state.pokemon,
//     username: state.user.username}
// };
//
//
// export default withRouter(connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Pokemons))

import React from "react";
import {connect} from 'react-redux';
import {fetchCourses, registerAClass} from '../studentActions/course.action'
// import {addPokemon, deletePokemon, fetchPokemon} from '../studentActions/pokemon.action'
import {withRouter} from "react-router";
import {selectUser} from "../studentActions/user.action";

class Courses extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        const { match } = this.props;
        const { username } = match.params;
        this.props.setUser(username);
        this.props.getCourses();
    }

    render() {
        if (this.props.loading) {
            return <h3>Loading...</h3>
        }

        return (<div>
            <h1>These are courses!</h1>
            <div>{this._renderCourseList()}</div>
        </div>);
    }

    // _deletePokemon(id) {
    //     this.props.deletePokemon(id, this.props.username);
    // }
    //
    // _addPokemon() {
    //     this.props.addPokemon(this.state, this.props.username);
    // }
    //
    // _handleFormUpdate(event, value) {
    //     this.setState({
    //         [value]: event.target.value || '',
    //     })
    // }

    _registerAClass(id) {
        this.props.registerAClass(id, this.props.username);
    }

    _renderCourseList() {
        const coursesRows = this.props.courses.map(course => (
            <tr key={course._id}>
                <td>{course._id}</td>
                <td>{course.capacity}</td>
                <td>{course.location}</td>
                <td>{new Date(course.startTime).toUTCString()}</td>
                <td>{new Date(course.endTime).toUTCString()}</td>
                <td><input type='button' value='Register' onClick={() => this._registerAClass(course._id)}/> </td>
            </tr>));
        return (<table>
            <thead>
            <tr>
                <th>id</th>studentId
                <th>capacity</th>
                <th>location</th>
                <th>start</th>
                <th>end</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {coursesRows}
            {/*<tr key={'input'}>*/}
            {/*    <td><input type={'text'} value={this.state.name} onChange={e => this._handleFormUpdate(e, 'name')}/></td>*/}
            {/*    <td><input type={'date'} value={this.state.birthday} onChange={e => this._handleFormUpdate(e, 'birthday')}/></td>*/}
            {/*    <td><input type={'number'} value={this.state.health} onChange={e => this._handleFormUpdate(e, 'health')}/></td>*/}
            {/*    <td><input type='button' value='Add' onClick={() => this._addPokemon()}/> </td>*/}
            {/*</tr>*/}
            </tbody>
        </table>)
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        // getPokemon: (username) => dispatch(fetchPokemon(username)),
        getCourses: () => dispatch(fetchCourses()),
        registerAClass: (courseId, username) => dispatch(registerAClass(courseId, username)),
        // addPokemon: (pokemon, username) => dispatch(addPokemon(pokemon, username)),
        // deletePokemon: (id, username) => dispatch(deletePokemon(id, username)),
        setUser: (username) => dispatch(selectUser(username)),
    }
}


function mapStateToProps(state, props) {
    return { ...state.course,
        username: state.user.username}
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Courses))