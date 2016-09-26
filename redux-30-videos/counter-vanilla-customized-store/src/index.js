const counter = (state = 0, action) => {
       switch(action.type) {
             case 'INCREMENT':
                  return state + 1;
             case 'DECREMENT':
                  return state - 1;
             default:
                  return state
       }
}
//import {createStore} from 'redux'; // remove lib
const createStore = (reducer) => {
      let state = reducer.state;
      let listeners = [];

      const getState = () => state;
      const dispatch = (action) => {
            state = reducer(state, action);
            listeners.forEach( l => l());
      };
      const subscribe = (listener) =>{
            listeners.push(listener);
            return ()=> {
                 listeners = listeners.filter(l => l !== listener );
                 //listeners;
            };
      };
      dispatch({});
      return {getState, dispatch, subscribe};
};
const store = createStore(counter);
const render = () => {
      document.getElementById('root').innerText = store.getState();
};
store.subscribe(render);
render();
document.addEventListener('click', () => {
         store.dispatch({type:'INCREMENT'});
}); 

