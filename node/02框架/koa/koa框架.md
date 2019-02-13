[从头实现一个 koa 框架](https://zhuanlan.zhihu.com/p/35040744)

# koa 笔记

## what is koa

Koa 是一个中间件系统。通过加载各种中间件完成任务。

## koa 中间件

### 是什么？

![](https://segmentfault.com/img/bVUsEI?w=687&h=460)

洋葱模型: 中间件以 next 为分界线会被执行两次
