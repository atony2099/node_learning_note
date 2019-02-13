var fs = require('fs');

function someAsyncOperation(callback) {
  // 花费2毫秒
  fs.readFile('./file.txt', callback);
}

var timeoutScheduled = Date.now();
var fileReadtime = 0;

setTimeout(function () {
  var delay = Date.now() - timeoutScheduled;
  console.log('setTimeout: ' + (delay) + "ms have passed since I was scheduled");
  // console.log('fileReaderTime', fileReadtime - timeoutScheduled);
}, 10);

fs.readFile('./eventloop.md', function () {
  console.log(Date.now() - timeoutScheduled, "call backmidi")
})

someAsyncOperation(function () {
  fileReadtime = Date.now();
  console.log(fileReadtime - timeoutScheduled, "read file big");
  // while (Date.now() - fileReadtime < 1000) {

  // }
});