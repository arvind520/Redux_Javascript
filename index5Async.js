const redux = require('redux')
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default // makes action creator to return function instead of object
const axios = require('axios')
const createStore = redux.createStore
const intialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}
const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}
const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

const reducer = (state = intialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return {...state, loading: true}
        case FETCH_USERS_SUCCESS:
            return {...state, loading: false, users: action.payload}
        case FETCH_USERS_FAILURE:
            return {...state, error: action.payload, users: []}
        default:
            return state
    }
}


const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            dispatch(fetchUsersSuccess(res.data.map(user => user.id)))
        })
        .catch(error => {
            dispatch(fetchUsersFailure(error))
        })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => console.log(store.getState()))
console.log(store.getState());
store.dispatch(fetchUsers())