/*
 * @Author: atony2099 
 * @Date: 2018-12-30 19:54:39 
 * @Last Modified by: atony2099
 * @Last Modified time: 2018-12-31 10:54:04
 */

const http = require('http'),fs = require('fs')

let file = fs.statSync('../big.file')
console.log(file,"=-===",file.isFile());




http.createServer(function(req,res){
  // var file = fs.readFile('../big.file', 'binary');
  // res.setHeader('Content-Length', stat.size);

  // res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Content-Disposition', 'attachment; filename=your_file_name');

  // 01======
  
  fs.createReadStream('../big.file').pipe(res);
  // res.write(file, 'binary');
  // res.end();

}).listen(8222)