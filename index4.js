//! Middleware
// before reaching the from action to reducer

// import redux from 'redux'; // for react js app1
const redux = require('redux');
const reduxLogger = require('redux-logger') //middelware

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const loggerMiddleWare = reduxLogger.createLogger();



const BUY_CAKE = 'BUY_CAKE';
const BUY_ICE_CREAM = 'BUY_ICE_CREAM'

// action creator
const buyCake = () => {
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}
const buyIceCream = () => {
    return {
        type: BUY_ICE_CREAM
    }
}
// (prevState, actoin) => newState

const initialCakeState = {
    numOfCake: 10,
}
const initialIceCreamState = {
    numOfIceCreams: 20
}

//reducer
const reducerCake = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numOfCake: state.numOfCake - 1
            }
        default: return state;
    }

}
const reducerIceCream = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case BUY_ICE_CREAM:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }
        default: return state;
    }

}

// let store = Redux.createStore(Redux.combineReducers({cake: reducerCake, icecream
//     : reducerIceCream}));

// store  jagah
const reducers = combineReducers({cake: reducerCake, icecream: reducerIceCream})

const store = createStore(reducers, applyMiddleware(loggerMiddleWare)); // runs for the first time on create

console.log('Initial State', store.getState())

//listening dekhne wala
const unsubscribe = store.subscribe(() => console.log('Update State', store.getState()))

//customer action
store.dispatch(buyCake());
store.dispatch({type: BUY_CAKE})
store.dispatch(buyIceCream())

unsubscribe(); 