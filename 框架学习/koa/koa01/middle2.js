//  中间件

let koa = require('koa');
let app = new koa();

// 1、 原理：将中间件加入一个数组中，调用next 会指向下一个中间件
// 2. 如果不调用 就不会走到下一个中间件

app.use( async (ctx, next) => {
   console.log(1);
  await next(); // next不写会报错
  console.log(4)
});

app.use(async  (ctx, next) => {
  console.log(2)
  await next();
  console.log(3)
});

// app.use(async (ctx, next) => {
//   // console.log(3)
// await （ ctx.body = 'Hello World'
// });

app.listen(3000);
// 打印出1、2、3、4、5
