
//
var fs = require('fs');
var readFile = require('fs-readfile-promise');



let file0 = './log.txt';
let file1 = './log1.txt';
let file2 = './log2/txt'


// fs.readFile(file0, function (err, data) {
//   if (err) throw err;
//   let str  =   data.toString()
//   // console.log(str, err);
//   fs.readFile(file1,function(err,data){
//     let str1  =   data.toString()
//     console.log(str + str1);
//   })
// });

//
// let a = readFile(file0);
//
// console.log(a);


readFile(file0)
.then(function(data){
  console.log(data.toString());
})
.then(function(){
  return readFile(file1);
})
.then(function(data){
  console.log(data.toString());
})
.catch(function(err) {
  console.log(err,"----");
});
