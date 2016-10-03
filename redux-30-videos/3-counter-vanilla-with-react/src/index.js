/* eslint-disable */

import React from 'react';
import ReactDom from 'react-dom';
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
            return ()=>listeners;
            //return ()=> {
            //     listeners = listeners.filter(l => l !== listener );
            // };
      };
      //dispatch({});
      return {getState, dispatch, subscribe};
};
const store = createStore(counter);
const Counter = ({value, onIncrement, onDecrement}) =>(
      <div>
      <h1>{value}</h1>
      <botton onClick={onIncrement}>+</botton>
      <botton onClick={onDecrement}>----</botton>
      </div>
);
const render = () => {
      ReactDom.render( 
           <Counter 
            value={store.getState()}
            onIncrement={() => store.dispatch({
                   type:'INCREMENT'
            })}
            onDecrement={() => store.dispatch({
                   type:'DECREMENT'
            })}
           />,  document.getElementById('root'));
};

store.subscribe(render);
render();
//document.addEventListener('click', () => {
//         store.dispatch({type:'INCREMENT'});
//}); 

