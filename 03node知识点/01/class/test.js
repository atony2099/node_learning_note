//
var delayPromise = function (time){
  return new Promise(function (resolve, reject){
    setTimeout(
      function(){
        let boolee = true
        if (boolee) {
          console.log(time);
          resolve("promise sleep" + time)
        }else {
          reject(new Error("has error"))
        }

      }, time
    )
  });
};

var co = require('co');



//

function genF(){
    var a =   yield delayPromise(1500);


   var a =   yield delayPromise(1500);
  var b =   yield delayPromise(2000);
    console.log("执行完毕",a,b);
}


func b {
  //
}


fu
// co(gen).then(()=> {{
//   console.log("执行完毕");
// }})cd

//
let gen =   genF()
let gen =   genF()
let gen =   genF()
let gen =   genF()
let gen =   genF()

// gen.next()
// gen.next()
// gen.next()








//
// let gen =  genF()
// var gen = myF();
 // 第一次调用next


 co(genF).then(()=> {{
   console.log("执行完毕");
 }})
 //
 gen.next().value.then((result) => {
    gen.next(result).value.then((result)=> {
        gen.next(result)
        gen.next(result).value.then((result)=> {
            gen.next(result)
            gen.next(result).value.then((result)=> {
                gen.next(result)
                gen.next(result).value.then((result)=> {
                    gen.next(result)

                })

            })

        })
    })
 }

 )
