const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();
const path = require('path')

let filePath = path.join(__dirname,'./front')
// app.use(static('test/fixtures'))

app.use(serve(filePath));

app.use(ctx=> {
    ctx.body = 'load static'
})

app.listen(7777)




