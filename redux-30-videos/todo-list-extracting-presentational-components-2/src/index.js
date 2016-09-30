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
const FilterLink = ({filter, currentFilter, onClick,children}) =>{
       if(filter === currentFilter){
               return(<span>{children}</span>);
       }
       console.log("?????"+children);

       return(
           <a href='#'
              onClick={e=>{
                         console.log("YYYYYY"+filter);
                         e.preventDefault();
                         onClick(filter);
              }}>{children}</a>
       );
};
const Todo = ({onClick, completed, text}) => (
              <li    
                onClick={onClick}
                  style={{textDecoration: completed ? 'line-through': 'none'}}
              >{text}</li>
);
const TodoList = ({todos, onTodoClick }) => (
              <ul>
                 {todos.map( todo => <Todo
                                        key={todo.id}
                                        {...todo}
                                        onClick={()=>onTodoClick(todo.id)}
                                     /> )}
              </ul>
);
const AddTodo = ({ onBottonClick}) =>{
      let input;
      return(    
          <div>
              <input ref={(node)=>{input=node;}}/>
              <botton onClick={()=>{ onBottonClick(input.value);
                                     input.value='';
                                   }
              }>Add Todo</botton>
          </div>
     );
}; 
const Footer = ({visibilityFilter, onFilterClick}) =>(
      <p>
            Show:{' '}
             <FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter} onClick={onFilterClick}>
             All
             </FilterLink>
             {' '}
             <FilterLink filter='SHOW_ACTIVE' currentFilter={visibilityFilter} onClick={onFilterClick}>
             Active
             </FilterLink>
             {' '}
             <FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter} onClick={onFilterClick}>
             Completed
             </FilterLink>
      </p>

); 
const getVisibleTodos =(todos, filter ) =>{
      switch(filter) {
            case 'SHOW_ALL':
                 return todos;
                 
            case 'SHOW_COMPLETED':
                 return todos.filter(
                        t=>t.completed
                 );
            case 'SHOW_ACTIVE':
                 return todos.filter(
                        t=>!t.completed
                 );
            default:
                return todos;
      }
};     
let nextTodoId=0;
class TodoApp extends React.Component {
      render(){
            const visibleTodos = getVisibleTodos(
                  this.props.todos,
                  this.props.visibilityFilter
            ); 
            return(
                <div>
                     <AddTodo 
                         onBottonClick={(inputValue)=>{
                                          store.dispatch({
                                                type:'ADD_TODO',
                                                text:inputValue,
                                                id: nextTodoId++
                                        });
                         }}
                     />
                     <TodoList 
                         todos={visibleTodos}
                         onTodoClick={(id) => store.dispatch({type:'TOGGLE_TODO',
                                                 id:id})}
                     />
                     <Footer 
                           visibilityFilter={this.props.visibilityFilter} 
                           onFilterClick={(filter)=>{ store.dispatch({
                                  type:'SET_VISIBILITY_FILTER',
                                  filter
                                });
                           //console.log(123+'>>>>>>>>>>>>>>>>>'+filter);
                           //console.log(children);
                          }
                     }/> 
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
