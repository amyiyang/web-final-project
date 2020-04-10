import pokemonReducers from "./pokemon.reducer";
import userReducer from "./user.reducer";
import courseReducer from "./course.reducer"
import registrationReducer from "./registration.reducer"
import assignmentReducer from "./assignment.reducer"
import {combineReducers} from 'redux'


export default combineReducers({
    pokemon: pokemonReducers,
    user: userReducer,
    course: courseReducer,
    registration: registrationReducer,
    assignment: assignmentReducer
})