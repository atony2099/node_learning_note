/*
 * @Author: atony2099 
 * @Date: 2018-12-30 19:40:25 
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-05 23:57:17
 */


var http = require('http');
var fs = require('fs');

var file = fs.createWriteStream("file.zip");
var request = http.get("http://47.95.200.95/api/music/download?id=5c274b620c2c895147907837", function(response) {
  response.pipe(file);
});





