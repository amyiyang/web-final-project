import Axios from 'axios'

function loadingPokemons() {
    return {
        type: "REQUEST_COURSES"
    }
}

function receivePokemonList(pokemons) {
    return {
        type: "RECEIVE_COURSES",
        pokemons
    }
}

function inFlight() {
    return {
        type: "REQUEST_INFLIGHT"
    }
}


export function fetchPokemon(username) {
    return function(dispatch) {
        dispatch(loadingPokemons());
        return Axios.get(`/api/pokemon?username=${username}`)
            .then(response => dispatch(receivePokemonList(response.data)),
                error => console.log('An error occurred.', error)
            );
    }
}

export function addPokemon(pokemon, username) {
    pokemon.owner = username;
    return function(dispatch) {
        dispatch(inFlight());
        return Axios.post(`/api/pokemon`, pokemon)
            .then(() => Axios.get(`/api/pokemon?username=${username}`),
                error => console.log('An error occurred.', error))
            .then(
                response => dispatch(receivePokemonList(response.data)),
                error => console.log('An error occurred.', error)
            )
    }
}

export function deletePokemon(pokemonId, username) {
    return function(dispatch) {
        dispatch(inFlight());
        return Axios.delete(`/api/pokemon/` + pokemonId)
            .then(() => Axios.get(`/api/pokemon?username=${username}`),
                error => console.log('An error occurred.', error))
            .then(
                response => dispatch(receivePokemonList(response.data)),
                error => console.log('An error occurred.', error)
            )
    }
}