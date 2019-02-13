/*
 * @Author: atony2099
 * @Date: 2018-12-27 16:40:28
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-22 15:31:14
 */

function base() {
  const fs = require("fs");
  const writeStream = fs.createWriteStream("./small.file");
  writeStream.write("go======\n");
  writeStream.end("go2===");
  writeStream.on("error", error => {
    console.log(error, "error=======");
  });
  writeStream.on("finish", () => {
    console.log("finish");
  });
}

base();

function implement() {
  const { Writable } = require("stream");
  const outStream = new Writable({
    write(chunk, encoding, callback) {
      console.log(chunk.toString(), encoding, "\n");
      callback();
    }
  });

  process.stdin.pipe(outStream);
}
implement();
