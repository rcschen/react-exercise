import expect from 'expect';
import deepFreeze from 'deep-freeze';

const testToggleTodo =(withFreeze, toggleTodo) => {
      const todoBefore = {
            id:0,
            text:'lear redux',
            completed: false
      };
      const todoAfter = {
            id:0,
            text:'lear redux',
            completed: true
      };
      if(withFreeze) {
         deepFreeze(todoBefore);
      }
      expect( 
            toggleTodo(todoBefore)
      ).toEqual(todoAfter);
};
var toggleTodo = (todo) => {
      todo.completed = !todo.completed;
      return todo;
}
testToggleTodo(false, toggleTodo);
console.log('no freeze is OK');

toggleTodo = (todo) => {
      return Object.assign({}, todo,  {
               completed: !todo.completed
              });
}
testToggleTodo(true, toggleTodo);
console.log('freeze_v1 is OK');

toggleTodo = (todo) => {
      return( { ...todo,  completed: !todo.completed });
}
testToggleTodo(true, toggleTodo)
console.log('freeze_v2 is OK');


