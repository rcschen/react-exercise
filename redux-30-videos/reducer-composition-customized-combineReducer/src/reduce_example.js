l=[1,2,3,4,5]
l.reduce(
 (previousValue, currentValue, index, array) =>{
     console.log("previousValue:"+previousValue);
     console.log("currentValue:"+currentValue);
     console.log("index:"+index);
     console.log("array:"+array);
     console.log("--------");
     return previousValue+currentValue;
},100)


o={ a: 1, b: 2 }
p={ u: 3, v: 4 }
q={o,p}
Object.keys(q).reduce(
   (previousValue, currentValue, index, array) =>{
     console.log("previousValue:"+previousValue);
     console.log("currentValue:"+currentValue);
     console.log("index:"+index);
     console.log("array:"+array);
     console.log("--------");
},{});
