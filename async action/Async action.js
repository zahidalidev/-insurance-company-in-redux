//Async Action

const redux = require('redux');  
const thunkMiddleware = require('redux-thunk').default; //define async action creators middleware
const axios = require('axios'); //for request to an API end point

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

//initial state
const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

//action creators
const fetchUserRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}
const fetchUserFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

//reducer
const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST: return {
            ...state,
            loading: true
        }
        case FETCH_USERS_SUCCESS: return {
            loading: false,
            users: action.payload,
            error: ''
        }
        case FETCH_USERS_SUCCESS: return {
            loading: false,
            users: [],
            error: action.payload
        }
    }
}

// Async action creator and thunk middle provind this action to return function
//  except of object and this action does not need be pure

const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUserRequest()) //requsting by passing action to dispatch
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(responce => { //if success
                const users = responce.data.map(user => user.id)
                dispatch(fetchUserSuccess(users))
            })
            .catch(error => { //if fail
                dispatch(fetchUserFailure(error.message))
            })
    }
}


//create store and applying thunk middleware    
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

//subscribe store
store.subscribe(()=>{console.log(store.getState())});

//dispatch Async action creator
store.dispatch(fetchUsers());
