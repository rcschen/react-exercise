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
console.log('all tests passed');

addCounter =(list) =>{
    //return list.concat([0]);
    return [...list,0];
    
};

const testAddCounter_with_freeze = () =>{
      const listBefore = [];
      const listAfter = [0];
      deepFreeze(listBefore);
      expect(addCounter(listBefore)).toEqual(listAfter);
};
testAddCounter_with_freeze();
console.log('pass with freeze')

const removeCounter  =(list, index) =>{
      //list.splice(index,1);
      //return list   
      //return list.slice(0, index).concat(list.slice(index+1));
      return [...list.slice(0,index),...list.slice(index+1)];
};

const testRemoveCounter_with_freeze = () =>{
      const listBefore = [0,10,20];
      const listAfter = [0,20];
      deepFreeze(listBefore);
      expect(removeCounter(listBefore, 1)).toEqual(listAfter);
};
testRemoveCounter_with_freeze();
console.log('pass remove counter with freeze')


const incrementCounter=(list,index) =>{
     //list[index]++;
     //return list;
     return list.slice(0,index).concat([ list[index]+1 ]).concat(list.slice(index+1));
     //return [...list.slice(0,index), list[index]+1, ...list.slice(index+1)];
};
const testIncrementCounter_with_freeze = ()=>{
      const listBefore = [0,10,20];
      const listAfter=[0,11,20];
      deepFreeze(listBefore);
      expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
};
testIncrementCounter_with_freeze();
console.log('pass increment counter with freeze')

