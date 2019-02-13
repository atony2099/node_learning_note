/*
 * @Author: atony2099 
 * @Date: 2018-12-31 18:33:30 
 * @Last Modified by: atony2099
 * @Last Modified time: 2018-12-31 18:37:24
 */


//  const {duplex} = require('stream');

 const { Duplex } = require('stream');
const inoutStream = new Duplex({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },

  read(size) {
    this.push(String.fromCharCode(this.currentCharCode++));
    if (this.currentCharCode > 90) {
      this.push(null);
    }
  }
});


inoutStream.currentCharCode = 65;


process.stdin.pipe(inoutStream).pipe(process.stdout);