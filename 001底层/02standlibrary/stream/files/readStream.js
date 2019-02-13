/*
 * @Author: atony2099 
 * @Date: 2018-12-30 12:38:35 
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-05 23:57:08
 */

var fs = require('fs');

function base(){
  var readStream = fs.createReadStream('./big.file');
  var content = '';
  readStream.setEncoding('utf8');
  let count = 0;
  readStream.on('data', function(chunk){
      count++
      console.log(count)
      content += chunk;
  });

  readStream.on('error',function(err){
    console.log(err,"=====")
  })

  readStream.on('close',function(err){
    console.log(err,"close=====")
  })

  readStream.on('end', function(chunk){
      console.log('文件读取完成，文件内容是 [%s]');
  });
}

function readStream(){
  const { Readable } = require('stream');
  const readStream = new Readable();
  readStream.push('ABCDE====\n');
  readStream.push(null)
  readStream.pipe(process.stdout)
}

readStream()


