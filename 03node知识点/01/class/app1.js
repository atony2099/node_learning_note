var fetch = require('node-fetch');
var co = require('co');

// function* gen(){
//   var url = 'https://api.github.com/users/github';
//   var result = yield fetch(url);
//   console.log(result.email);
// }
//
// var g = gen();
// var result = g.next();
//
// result.value.then(function(data){
//   return data.json();
// }).then(function(data){
//   g.next(data);
// });

// 2. ===如何代替回调函数
function delay(time, callback){
    setTimeout(function(){
        callback("Slept for "+time);
    },time);
}

// ==== 一般的写法 ==== 嵌套的写法
// delay(1000,function(msg){
//     console.log(msg);
//     delay(1200,function(msg){
//         console.log(msg);
//     });
// })



run(function* myDelayedMessages(resume) {
    console.log(yield delay(1000, resume));
    console.log(yield delay(1200, resume));
})

function run(generatorFunction) {
    var generatorItr = generatorFunction(resume);
    function resume(callbackValue) {
        // 启动的时机 === 在 callback的时候启动==
        generatorItr.next(callbackValue);
    }
    generatorItr.next()
}

// 2. 关键点  =======
// 将有回调函数包装在一个单参数(只有回调函数参数)的函数里， 作为返回值
function delay(time, callback){
    setTimeout(function(){
        callback("Slept for "+time);
    },time);
}
//  返回的是是一个带着回调的函数
var ThunkDelay = function (time){
  return function innerCallBack(callback){
    return delay(time, callback);
  };
};

/// ======= (tunk)!!! =============
function* myTunkFunc() {
  yield ThunkDelay(1000);
  yield ThunkDelay(2000);
};

let  tunk = myTunkFunc()
// let  f  = tunk.next();
// f.value((time)=> {
//   console.log(time);
//   let  ff  = tunk.next();
//   ff.value(time => {
//     console.log(time);
//   })
// })




// 自动执行 ===
function run(fn) {
  var gen =  fn();
  function next(time) {
    var result = gen.next(time);
    console.log(time);

    if (result.done) return;
    result.value(next);
  }
  next();
}

// run(myTunkFunc);



//基于promis 的封装  ======
function delay(time, callback){
    setTimeout(function(){
        callback("Slept for "+time);
    },time);
}

var delayPromise = function (time){
  return new Promise(function (resolve, reject){
    setTimeout(
      function(){
        let boolee = true
        if (boolee) {
          resolve("promise sleep" + time)
        }else {
          reject(new Error("has error"))
        }

      }, time
    )
  });
};

function* gen(){
let k =  yield delayPromise(1500);
let g =   yield delayPromise(2000);

console.log(k,g);
}

let g =  gen()
let pro = g.next();
//
// pro.value.then((time)=> {
//   console.log(time);
//   g.next().value.then((time)=> {
//     console.log(time);
//   })
// })
//
//
// // === 3. 自动执行======
// co(gen).then(()=> {{
//   console.log("执行完毕");
// }})

// 4. aync --- awit ==
async function  ayncGen(){
  let k =  await delayPromise(1000);
  let g =   await delayPromise(2000);
  console.log(k, g);
}

ayncGen();
