import expect from 'expect';
import deepFreeze from 'deep-freeze';
var addCounter =(list) =>{
    list.push(0);
    return list
};


const testAddCounter = () =>{
      const listBefore = [];
      const listAfter = [0];
      expect(addCounter(listBefore)).toEqual(listAfter);
};
testAddCounter();

addCounter =(list) =>{
    //return list.concat([0]);
    return [...list,0];
    
};

console.log('all tests passed');
const testAddCounter_with_freeze = () =>{
      const listBefore = [];
      const listAfter = [0];
      deepFreeze(listBefore);
      expect(addCounter(listBefore)).toEqual(listAfter);
};
testAddCounter_with_freeze();
console.log('pass with freeze')


