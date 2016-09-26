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
import {createStore} from 'redux';
const store = createStore(counter);
/** TRACK 1:
console.log(store.getState());
store.dispatch({type: 'INCREMENT'});
console.log(store.getState());
**/

/** TRACK 2:
store.subscribe(() => {
      document.getElementById('root').innerHTML = store.getState().toString();
});
document.addEventListener('click', () => {
         store.dispatch({type:'INCREMENT'});
}); 
**/
const render = () => {
      document.getElementById('root').innerHTML = store.getState().toString();
    
};
store.subscribe(render);
render();
document.addEventListener('click', () => {
         store.dispatch({type:'INCREMENT'});
}); 

