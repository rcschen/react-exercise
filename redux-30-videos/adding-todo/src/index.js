import expect from 'expect';
import deepFreeze from 'deep-freeze';

const todos = (state=[], action) => {
        return([...state,
            {  id:action.id,
               text: action.text,
               completed: false
        }]);
};
const testAddTodo = () => {
       const stateBefore = [];
       const action ={
              type: 'ADD_TODO',
              id: 0,
              text: 'Learn Redux'
       };
       const stateAfter = [{
         id:0,
         text: 'Learn Redux',
         completed: false
       }];
       deepFreeze(stateBefore);
       deepFreeze(action);
       expect(todos(stateBefore, action)).toEqual(stateAfter);
};
testAddTodo();
console.log('test ok');
