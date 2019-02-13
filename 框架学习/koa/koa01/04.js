
// demos/02.js
const fs = require('fs');
const Koa = require('koa');
const app = new Koa();
const path = require('path')


let localPath = path.join(__dirname, './template.html')

const main = ctx => {
  ctx.response.type = 'html';
  let data  = fs.readFileSync(localPath);
  console.log(data,"Datais")
  ctx.body = data;




};



app.use(main);
app.listen(9900);
