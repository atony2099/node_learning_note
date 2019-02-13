/*
 * @Author: atony2099
 * @Date: 2019-02-01 18:36:13
 * @Last Modified by:   atony2099
 * @Last Modified time: 2019-02-01 18:36:13
 */
const koa = require("koa");
const app = new koa();

app.use(async ctx => {
  ctx.body = "hello docker";
});

app.listen(3000);
