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
const Link = ({
      active,
      onClick,
      children}) =>{
       if(active){
               return(<span>{children}</span>);
       }

       return(
           <a href='#'
              onClick={e=>{
                         e.preventDefault();
                         onClick();
              }}>{children}</a>
       );
};
class FilterLink extends React.Component {
       componentDidMount(){
            this.unsuscribe = store.subscribe( () => this.forceUpdate());
       }
       componentWillUnmount(){
            this.unsuscribe();
       }
       render() {
           const props = this.props;
           const state = store.getState();
           return(
           <Link active={props.filter === state.visibilityFilter}
                 onClick={()=>{ store.dispatch({
                                    type:'SET_VISIBILITY_FILTER',
                                    filter:props.filter})
                              }
                         }
           >{props.children}</Link>);
       }
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
let nextTodoId=0;

const AddTodo = () =>{
      let input;
      return(    
          <div>
              <input ref={(node)=>{input=node;}}/>
              <botton onClick={(inputValue)=>{
                                        store.dispatch({
                                                type:'ADD_TODO',
                                                text:input.value,
                                                id: nextTodoId++
                                        });
                                        input.value='';
                         }}
              >Add Todo</botton>
          </div>
     );
}; 
const Footer = () =>(
      <p>
            Show:{' '}
             <FilterLink filter='SHOW_ALL' >
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
class VisibleTodoList extends React.Component {
       componentDidMount(){
            this.unsuscribe = store.subscribe( () => this.forceUpdate());
       }
       componentWillUnmount(){
            this.unsuscribe();
       }

      render(){
              const props = this.props;
              const state = store.getState();
              return(
                   <TodoList 
                         todos={getVisibleTodos(state.todos,
                                                state.visibilityFilter
                                )
                               }
                         onTodoClick={id=>store.dispatch({type:'TOGGLE_TODO',
                                                          id
                                                         }
                                                        )
                                     }
                   />
              );
      }
}  

const TodoApp = () => (
      <div>
         <AddTodo />
         <VisibleTodoList />
         <Footer /> 
      </div>
);

ReactDOM.render(
            <TodoApp />,
            document.getElementById('root')
      );