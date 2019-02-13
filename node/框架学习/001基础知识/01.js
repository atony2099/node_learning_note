console.log('start=')


var http = require('http')

http.createServer((request,response) => {
  response.writeHead(200,{"Content-Type":"text/plain"})
  response.write("hello == node")
  throw new Error()
  response.end()
}).listen(9999)