/*
 * @Author: atony2099
 * @Date: 2018-12-27 16:48:27
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-23 02:39:29
 */

var fs = require("fs");
// var request = require("request");

pipe();
compress2();

// 1. pipe
function pipe() {
  // 创建一个可读流
  var readerStream = fs.createReadStream("./files/big.file");
  // 创建一个可写流
  var writerStream = fs.createWriteStream("./files/pipe.txt");
  readerStream.on("end", function() {
    console.log("read end");
  });
  writerStream.on("finish", function() {
    console.log("write finish");
  });
  // 管道读写操作
  // 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
  readerStream.pipe(writerStream);
  console.log("程序执行完毕");
}

// compress2();
