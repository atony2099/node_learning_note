/*
 * @Author: atony2099
 * @Date: 2019-01-20 16:40:18
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-29 03:33:54
 */

const hostname = "127.0.0.1";
const port = 3004;

const App = require("./app/app");
app = new App();

let responseData = {};

app.use(async (ctx, next) => {
  responseData.name = "tom";
  await next();
  ctx.body = responseData;
});

app.use(async (ctx, next) => {
  responseData.age = 16;
  await next();
});

app.use(async ctx => {
  responseData.sex = "male";
});

app.listen(port, () => {
  console.log("listening on ", port);
});
