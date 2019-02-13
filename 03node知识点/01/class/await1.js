var fs = require('fs');
const {promisify} = require("es6-promisify");
var readFilePromise = promisify(fs.readFile);

function timeout(ms,value) {
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      // console.log("current second",ms);
      console.log(value,ms);
      if (ms < 1000) {
        resolve()
      }else {
        // console.log("error");
        reject(new Error("error"))
      }

    } , ms);
  });
}

// 1.------------------ 阻塞aync 函数的执行 ======
// 2.-----------------  阻塞函数，不阻塞主线程的执行
async function asyncPrint(value) {
  await timeout(300,value)
  await timeout(700,value)
  await timeout(600,value)
  console.log(value)
}



// asyncPrint("first fun")
// console.log("gogogo first");





// asnce 可以 awiat 另一个 aynces
async function asyncPrint2(value) {
  let resulte   = await asyncPrint(value).catch(error => console.log("2=======",error))
  console.log("zzz",resulte)
  // await console.log(value)
}

asyncPrint2('222s');
