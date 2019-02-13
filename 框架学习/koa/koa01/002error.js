const Koa = require('koa');
const app = new Koa();


// const logger = (ctx, next) => { 

//   next();
//   // throw new Error("error")0

//   const err = new Error('name required');
//   err.status = 402;
//   throw err;


//   // ctx.throw(400,"requiere")
// }
// app.use(async (ctx, next) => {
//   try {
//     await next();
//   } catch (err) {
//     console.log("hello==")
//     ctx.status = err.status || 500;
//     ctx.body = err.message;
//     // ctx.app.emit('error', err, ctx);
//   }
// });

app.use(async (ctx, next) => {
  // console.log("hello")
  //will NOT log the error and will return `Error Message` as the response body with status 400
  // throw new Error()
  ctx.throw(500,'Error Message');
}); 


const main = ctx => {
  ctx.response.body = 'Hello World';

};

app.on('error', err => {
  console.log('server====== error', err.status);
  // log.error(
});

// app.use(logger);
app.use(main);



app.listen(9999);

