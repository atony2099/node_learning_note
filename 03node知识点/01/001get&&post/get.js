/*
 * @Author: atony2099 
 * @Date: 2018-09-17 12:45:42 
 * @Last Modified by: atony2099
 * @Last Modified time: 2018-09-17 14:30:41
 */


var http = require('http');
var url = require('url');
var util = require('util');

console.log("hellp")
 
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    // res.end(util.inspect(url.parse(req.url, true)));

    // 解析 url 参数
    var params = url.parse(req.url, true).query;
    res.write("网站名：" + params.name);
    res.write("\n");
    res.write("网站 URL：" + params.url);
    res.end();
}).listen(3000);