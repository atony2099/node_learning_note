
let a =  (out) => (inner) => {
    console.log("call me")
    console.log(out,inner)
}

let q = function(out) {
   return  function(inner){
     console.log(out,inner,inner-last) 
   }
}

a("out")("inner")



//多箭头函数的本质
//: 返回时一个函数。利用闭包的特性， 他还可以持有调用他的函数的参数。

let add = x => y => x + y;
console.log('====================================');
console.log(add(10)(90));
console.log('====================================');


