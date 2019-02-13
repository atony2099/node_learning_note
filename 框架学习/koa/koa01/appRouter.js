const Koa = require('koa');
const app = new Koa();

const main = ctx => {

  ctx.response.body = {
    name:'tang'
  }

  return;
  if (ctx.request.path !== '/') {
    ctx.response.type = 'html';
    ctx.response.body = '<a href="/">sub page</a>';
  } else {
    ctx.response.body = 'indexPg';
  }
};

app.use(main);
app.listen(5000);
