// import redux from 'redux'; // for react js app
const redux = require('redux')
const createStore = redux.createStore;
const BUY_CAKE = 'BUY_CAKE';
// action creator
const buyCake = () => {
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}

// (prevState, actoin) => newState

const initialState = {
    numOfCake: 10
}

//reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numOfCake: state.numOfCake - 1
            }
        default: return state;
    }

}

// store  jagah
const store = createStore(reducer);
console.log('Initial State', store.getState())

//listening dekhne wala
const unsubscribe = store.subscribe(() => console.log('Update State', store.getState()))

//customer action
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch({type: BUY_CAKE})
unsubscribe(); 