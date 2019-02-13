// demos/06.js
const route = require('koa-route');
const Koa = require('koa');
const app = new Koa();

const about = ctx => {
  ctx.response.type = 'html';
  ctx.response.body = '<a href="/">Index Page</a>';
};

const main = function() {
  this.body = 'Hello World=====';
};

app.use(route.get('/', main));
app.use(route.get('/about', about));
app.listen(5000);
