/*
 * @Author: atony2099 
 * @Date: 2018-12-30 18:50:08 
 * @Last Modified by: atony2099
 * @Last Modified time: 2018-12-30 18:51:28
 */

const http = require('http')
http.createServer(function(request,response){
  response.writeHead(200, { 'Content-Type': 'text-plain' });
  response.end('Hello World\n');
}).listen(8222)

// createHttp()https://devhints.io/nodejs-stream