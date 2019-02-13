/*
 * @Author: atony2099 
 * @Date: 2018-07-31 10:29:02 
 * @Last Modified by: atony2099
 * @Last Modified time: 2018-07-31 10:35:33
 */

//  中间件

let koa = require('koa');
let app = new koa();


// logger 
app.use(async(ctx,next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
})


// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(8003);
