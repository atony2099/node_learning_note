
// demos/02.js
const fs = require('fs');
const Koa = require('koa');
const app = new Koa();

// 0。  ctx == context  表示一次http会话的上下文
const main = ctx => {
  ctx.response.body = "<h1>hello</h1>"
};

app.use(main);
app.listen(3000);
