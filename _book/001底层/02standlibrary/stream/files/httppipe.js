/*
 * @Author: atony2099 
 * @Date: 2018-12-27 16:53:39 
 * @Last Modified by:   atony2099 
 * @Last Modified time: 2018-12-27 16:53:39 
 */


const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  const src = fs.createReadStream('./big.file');
  src.pipe(res);
});

server.listen(8002);
