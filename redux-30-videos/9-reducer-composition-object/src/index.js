const todo = (state, action) =>{
       switch(action.type) {
              case 'ADD_TODO':
                    return {id:action.id,
                           text: action.text,
                           completed: false
                           }; 
              case 'TOGGLE_TODO':
                   if(state.id !== action.id){
                         return state;
                      }
                      return {...state,
                         completed: !state.completed
                      };
                  
              default:
                    return state;
       }

};
const todos = (state=[], action) => {
        switch(action.type) {
             case 'ADD_TODO':
                  return([...state, todo(state,action)]);
             case 'TOGGLE_TODO':
                  return state.map((t) => todo(t, action));
             default:
                   return state;
        }
};
const visibilityFilter = (state='SHOW_ALL', action) =>{
        switch(action.type) {
             case 'SET_VISIBILITY_FILTER':
                   return action.filter;
             default:
                   console.log("!!!!!!!"+state);
                   return state
        }
};

const todoApp = (state={}, action) =>{
      console.log("??????"+state.visibilityFilter);
      return {
              todos: todos(state.todos, action),
              visibilityFilter: visibilityFilter(state.visibilityFilter, action)
      };
};
//import {createStore} from 'redux';
const createStore = (reducer) => {
      let state;
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

const store = createStore(todoApp);
console.log('Initial state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching ADD_TODO:');
store.dispatch({
        type: 'ADD_TODO',
        id: 0,
        text:'Learn Redux'
});
console.log('Current state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching ADD_TODO:');
store.dispatch({
        type: 'ADD_TODO',
        id: 1,
        text:'Go Shopping'
});
console.log('Current state:');
console.log(store.getState());
console.log('--------------');
console.log('Dispatching TOGGLE_TODO:');
store.dispatch({
        type: 'TOGGLE_TODO',
        id: 1,
});
console.log('Current state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching SET_VISIBILITY_FILTER');
store.dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter:'SHOW_COMPLETED'
});
console.log('Current state:');
console.log(store.getState());
console.log('--------------');

