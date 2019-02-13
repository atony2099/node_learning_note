/*
 * @Author: atony2099 
 * @Date: 2019-01-01 16:18:41 
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-16 20:58:16
 */

// setTimeout(() => {
//   console.log("timeout")
// }, 0);
// process.nextTick(() => console.log("tick"))
// console.log("begin")


console.log("start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

Promise.resolve()
  .then(function () {
    console.log("promise1");
  })
  .then(function () {
    console.log("promise2");
  });

console.log("end");