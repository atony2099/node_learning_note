
// 1. 如何创建。


function add(a,b,c){
    return a + b + c
}

console.log('====================================');
console.log(add(1,2,3));
console.log('====================================');



//==== 科里化===
function addM(a){
    return function(b){
        return function(c){
            return a + b + c
        }
    }
}
let q = addM(10)(20)(30)
console.log('====================================');
console.log(q);
console.log('====================================');