const redux = require('redux');
const createStore = redux.createStore;

const BUY_CAKE = "BUT_CAKE";

//initial state
const initialState = {
    numebrOfCake: 20
}

//action creator
const buyCake = () => {
    return {
        type: BUY_CAKE,
        info: "first action"
    }
}

//reducer
const reducer = (state = initialState, buyCake) => {
    switch(buyCake.type){
        case BUY_CAKE: return{
            ...state,
            numebrOfCake: state.numebrOfCake - 1
        }
        default: return state
    }
}


//creating store
const store = createStore(reducer);
console.log('initial state', store.getState());

//subscriing and showing updated state //setyp listner
const unsubscribe = store.subscribe(()=>console.log('updated state', store.getState()));

//dispatching
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

//unsubscribing 
unsubscribe()

