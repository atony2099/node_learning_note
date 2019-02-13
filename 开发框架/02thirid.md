# passport

app.post('/login', passport.authenticate('local', { successRedirect: '/',
failureRedirect: '/login' }));

1. 定义策略
2. 使用策略。

[koa-passport学习笔记](https://segmentfault.com/a/1190000013060327)


