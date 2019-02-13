//  中间件

let koa = require('koa');
let app = new koa();


app.use((ctx, next) => {
  const start = Date.now();
  console.log("start====1111");
  return  next().then(() => {
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });
});

app.use((ctx, next) => {
    ctx.body = "hell world"
});


app.listen(3000);
// 打印出1、2、3、4、5
