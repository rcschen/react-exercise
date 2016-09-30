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
                  console.log("TTTDODODOD"+action.text);
                  return([...state, todo(state,action)]);
             case 'TOGGLE_TODO':
                  let l=state.map((t) => todo(t, action));
                  console.log("mmmmm");
                  console.log(l);
                  return l;
             default:
                   return state;
        }
};
const visibilityFilter = (state='SHOW_ALL', action) =>{
        switch(action.type) {
             case 'SET_VISIBILITY_FILTER':
                   console.log(action);
                   return action.filter;
             default:
                   return state
        }
};
import { combineReducers } from 'redux'
const todoApp = combineReducers({
      todos,
      visibilityFilter
});
import {createStore} from 'redux';
const store = createStore(todoApp);

import ReactDOM from 'react-dom';
import React from 'react';
const FilterLink = ({filter, children}) =>{
       return(
           <a href='http://www.google.com'
              onClick={e=>{
                         e.preventDefault();
                         store.dispatch({
                                type:'SET_VISIBILITY_FILTER',
                                filter
                         });
                    //console.log(123+'>>>>>>>>>>>>>>>>>'+filter);
                    //console.log(children);
                       }}
               >{children}</a>
       );
};
const getVisibleTodos =(todos, filter ) =>{
      console.log(">>>>"+filter);
      switch(filter) {
            case 'SHOW_ALL':
                 console.log("ALL");

                 return todos;
                 
            case 'SHOW_COMPLETED':
                 console.log("COMPLETE");
                 return todos.filter(
                        t=>t.completed
                 );
            case 'SHOW_ACTIVE':
                 console.log('ACTIVE');
                 return todos.filter(
                        t=>!t.completed
                 );
            default:
                 console.log("DEFAULT");

                return todos;
      }
};     
let nextTodoId=0;
class TodoApp extends React.Component {
      render(){
            console.log(this.props);
            const visibleTodos = getVisibleTodos(
                  this.props.todos,
                  this.props.visibilityFilter
            ); 
            console.log(visibleTodos); 
            return(
                <div>
                     <input ref={ (node) => {this.input = node}
                     }/>
                     <botton onClick={()=>{
                             store.dispatch({
                                   type:'ADD_TODO',
                                   text:this.input.value,
                                   id: nextTodoId++
                             });
                             this.input.value='';
                     }}>Add Todo</botton>
                     <ul>
                           {visibleTodos.map(
                               (todo) => <li key={todo.id}
                                             onClick={()=>{store.dispatch({type:'TOGGLE_TODO',
                                                                            id:todo.id})}}
                                             style={{textDecoration:todo.completed ? 'line-through': 'none'}}
                                         >{todo.text}</li>
                           )}
                     </ul>
                     <p>
                        Show:{' '}
                        <FilterLink filter='SHOW_ALL'>
                        All
                        </FilterLink>
                        {' '}
                        <FilterLink filter='SHOW_ACTIVE'>
                        Active
                        </FilterLink>
                        {' '}

                        <FilterLink filter='SHOW_COMPLETED'>
                        Completed
                        </FilterLink>

            
                     </p>
                </div>
            );
      }
}

const render =() =>{
      ReactDOM.render(
            //<TodoApp  todos={store.getState().todos}/>,
            <TodoApp  {...store.getState()}/>,

            document.getElementById('root')
      );
};
store.subscribe(render);
render();
