import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS'
export const ADD_POKEMONS = 'ADD_POKEMONS'
export const GET_DETAILS = 'GET_DETAILS'
export const GET_TYPES = 'GET_TYPES'
export const CLEAR_DETAILS = 'CLEAR_DETAILS'
export const CHANGE_PAGE = 'CHANGE_PAGE'
export const CHANGE_FILTER = 'CHANGE_FILTER'
export const CHANGE_ORDER = 'CHANGE_ORDER'
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME'
export const CREATE_POKEMON = 'CREATE_POKEMON'
export const ABOUT_MSG = 'ABOUT_MSG'
export const MENU = 'MENU'
export const TOT = 'TOT'
export const DELETE_POKEMON = 'DELETE_POKEMON'

/* export function getPokemons(){
    return async function (dispatch) {
        const data = await axios.get('http://localhost:3001/pokemons')
        dispatch({type: GET_POKEMONS, payload: data})   
    }
} */

export function getPokemons(packs=1){
    return function (dispatch) {
        return fetch('http://localhost:3001/pokemons?packs='+packs)
        .then(r => r.json())
        .then(json => {
            if(packs>1) {
                return dispatch({type: ADD_POKEMONS, payload: json})
            }
            dispatch({type: TOT, payload: json.length})
            dispatch({type: GET_POKEMONS, payload: json})
        })
        .catch(err => {console.log('fallo getPokemons; ', err)})
    }
}

export function getDetails(id){
    return async (dispatch) => {
        const data = await axios.get(`http://localhost:3001/pokemons/${id}`)
        dispatch({type: GET_DETAILS, payload: data.data})
    } 
}

export function clearDetails(){
    return (dispatch) => {
        dispatch({type: CLEAR_DETAILS})
    }
}

export function getPokemonByName(name){
    return (dispatch) => {
        axios.get(`http://localhost:3001/pokemons?name=${name}`)
        .then(data => {
            dispatch({type: GET_POKEMON_BY_NAME, payload: data.data})
        })
        .catch(err => {
            console.log(err)
            return dispatch({type: GET_POKEMON_BY_NAME, payload: err})
        })
    }
}

export function getTypes(){
    return async (dispatch) => {
        const data = await axios.get('http://localhost:3001/types')
        dispatch({type: GET_TYPES, payload: data.data})
    }
}

export function changePage(page){
    return (dispatch) => {
        dispatch({type: CHANGE_PAGE, payload: page})
    }
}

export function changeFilter(filter){
    return (dispatch) => {
        dispatch({type: CHANGE_FILTER, payload: filter})
    }
}

export function changeOrder(order){
    return (dispatch) => {
        dispatch({type: CHANGE_ORDER, payload: order})
    }
}

export function createPokemon(details, history){
    return (dispatch) => {
        axios.post('http://localhost:3001/pokemons', details)
        .then(r => {
            if(r.data.error) return alert('Error: '+ r.data.error)
            dispatch({type: TOT, payload: 1})
            dispatch({type: CREATE_POKEMON, payload: r.data})
            history.push('/home')
        }) 
    }
}
export function aboutMsgFalse(){
    return(dispatch) => {
        dispatch({type: ABOUT_MSG, payload: ''})
    }
}
export function toogleMenu(bool = '!'){
    return(dispatch) => {
        dispatch({type: MENU, payload: bool})
    }
}
export function deletePokemon(id){
    return async (dispatch) => {
        const data = await axios.delete(`http://localhost:3001/pokemons/${id}`)
        dispatch({type: TOT, payload: -1})
        dispatch({type: DELETE_POKEMON, payload: data.data})
    }
}
export function upTot(n=1){
    return(dispatch) => {
        dispatch({type: TOT, payload: n})
    }
}


