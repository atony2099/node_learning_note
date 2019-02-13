/*
 * @Author: atony2099 
 * @Date: 2018-12-27 16:40:28 
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-05 23:57:12
 */


function base(){

  const fs = require('fs');
  const writeStream = fs.createWriteStream('./small.file');
  // for(let i=0; i<=10000 ; i++) {
  //   writeStream.write('abc Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n');
  // }
  writeStream.write('go======\n')
  writeStream.end('go2===');
  writeStream.on('error',(error)=>{
    console.log(error,"error=======");
  })
  writeStream.on('finish',()=>{
    console.log('finish',);
  })
}



function implement(){
  const { Writable } = require('stream');
  const outStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString(),encoding,"\n");
    callback();
    }
  });
  process.stdin.pipe(outStream)

}
implement()

