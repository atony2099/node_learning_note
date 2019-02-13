const R = require('ramda');

// 1. map --- 转换 
let q = R.map(x=>x*10)([1,2,3])
console.log('====================================');
console.log(q);
console.log('====================================');


// 2. compose 

var addNum = (x,y) => x+y
var addUnit = x =>  x + '元'


let result = R.compose(addUnit,addNum)(10,5)
console.log('====================================');
console.log(result);
console.log('====================================');





let k = R.forEachObjIndexed((X)=>{
        let z = X * 10
        console.log(z,"resulte");
        return z
 })([1,2,3,4,5])

console.log('====================================');
console.log(k,"k is");
console.log('====================================');