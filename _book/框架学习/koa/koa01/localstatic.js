
// demos/02.js
const fs = require('fs');
const Koa = require('koa');
const app = new Koa();
const path = require('path')
let localPath = path.join(__dirname, './template.html')
let imagePath = path.join(__dirname,"./static/image/nodejs.jpg")


const main = ctx => {
  console.log(ctx.url,"local-url")
  ctx.type = 'image/jpeg';
  ctx.body  = fs.readFileSync(imagePath);
};
app.use(main);
app.listen(7777);






