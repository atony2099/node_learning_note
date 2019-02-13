var fs = require('fs');
const {promisify} = require("es6-promisify");
var readFilePromise = promisify(fs.readFile);

// var asyncReadFile = async function (){
//   var f1 = await readFilePromise('./log1.txt');
//   var f2 = await readFilePromise('./log2.txt');
//   console.log(f1.toString());
//   console.log(f2.toString());
// };
//
// asyncReadFile()



// 等待异步返回-- 阻塞当前函数的执行
function timeout(ms) {
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      console.log("current second",ms);
      resolve()
    } , ms);
  });
}

// 阻塞aync 函数的执行 ======

async function asyncPrint(value, ms) {
  await timeout(ms);
  await timeout(ms);
  await timeout(ms);
  await console.log(value)
}

asyncPrint('hello world', 1000);
