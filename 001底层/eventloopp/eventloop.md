# evnetloop

[深入理解 js 事件循环机制（Node.js 篇）](http://lynnelv.github.io/js-event-loop-nodejs)
[What is the Event Loop?](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#poll)
[事件循环](https://github.com/yjhjstz/deep-into-node/blob/master/chapter5/chapter5-1.md)
[Node.js 源码解析：深入 Libuv 理解事件循环](https://zhuanlan.zhihu.com/p/35039878)
[What you should know to really understand the Node.js Event Loop](https://medium.com/the-node-js-collection/what-you-should-know-to-really-understand-the-node-js-event-loop-and-its-metrics-c4907b19da4c)
[Node.js Event Loop 的理解 Timers，process.nextTick()](https://cnodejs.org/topic/57d68794cb6f605d360105bf)

## what is event loop? no-blocking

js 处理异步的机制并不是直接开启多线程去处理耗时操作，而是把这些事件  交给底层的多线程去实现(no-blocking)。 自己开启一个 while 循环不断去检查和执行回调
事件  循环由  一系列的步骤组成。

> 事件循环并没有开启一个新的线程。

> The event loop as a process is a set of phases with specific tasks that are processed in a round-robin manner.

## 简  析事件循环的几个步骤。

```shell
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

![](http://lynnelv.github.io/img/article/event-loop/node-libuv.png)

![](https://segmentfault.com/img/bV6iwC?w=655&h=503)

```js
while(runing){
  check and excute callback;
}
```

```cs
int uv_run(uv_loop_t* loop, uv_run_mode mode) {
  int timeout;
  int r;
  int ran_pending;

//首先检查我们的loop还是否活着
//活着的意思代表loop中是否有异步任务
//如果没有直接就结束
  r = uv__loop_alive(loop);
  if (!r)
    uv__update_time(loop);

//传说中的事件循环，你没看错了啊！就是一个大while
  while (r != 0 && loop->stop_flag == 0) {
      //更新事件阶段
    uv__update_time(loop);

    //处理timer回调
    uv__run_timers(loop);

    //处理异步任务回调
    ran_pending = uv__run_pending(loop);

    //没什么用的阶段
    uv__run_idle(loop);
    uv__run_prepare(loop);
    //如果是UV_RUN_ONCE的模式,并且pending_queue队列为空,或者采用UV_RUN_DEFAULT(在一个loop中处理所有事件),则将timeout参数置为
    //最近的一个定时器的超时时间,防止在uv_io_poll中阻塞住无法进入超时的timer中
    timeout = 0;
    if ((mode == UV_RUN_ONCE && !ran_pending) || mode == UV_RUN_DEFAULT)
      timeout = uv_backend_timeout(loop);
    uv__io_poll(loop, timeout);

    //就是跑setImmediate
    uv__run_check(loop);

    //关闭文件描述符等操作
    uv__run_closing_handles(loop);

    //再次检查是否活着
    //如果没有任何任务了，就推出
    r = uv__loop_alive(loop);
    if (mode == UV_RUN_ONCE || mode == UV_RUN_NOWAIT)
      break;
  }
  return r;
}
```

1.  timers 阶段：执行 setTimeout 和 setInterval 回调。
2.  pending callback：  处理系统调用错误的回调.比如网络 stream, pipe, tcp, udp 通信的错误 callback.
3.  poll: 1. 如果 poll queue 不为  空，则依次执行 poll queue 的回调 2. 如果 pol queue 为空， 则 event loop 阻塞直到 callback 返回 > 如果注册了 setImmediate，则会进入 check 阶段，执行 setImmediate
    当 poll queue 为空的时候，会去检查 timer，如果有 timer 时间到了，就会跳出  该阶段。


    

### process.nexttick

each iteration of an event loop is called a tick

### 事件循环什么时候开始？

所有同步任务结束后

## why settimeout is not precious?

```node
var fs = require("fs");
function someAsyncOperation(callback) {
  // 花费2毫秒
  fs.readFile("./eventloop.md", callback);
}
var timeoutScheduled = Date.now();
var fileReadTime = 0;

// 1.
setTimeout(function() {
  var delay = Date.now() - timeoutScheduled;
  console.log("setTimeout: " + delay + "ms have passed since I was scheduled");
  console.log("fileReaderTime", fileReadtime - timeoutScheduled);
}, 10);

// 2.
someAsyncOperation(function() {
  fileReadtime = Date.now();
  while (Date.now() - fileReadtime < 1000) {}
});
// output:
// 1004ms have passed since I was scheduled
//fileReaderTime 4
```

由于事件  循环是按照顺序执行，在某个阶段执行事件太长会影响 settimout 的 callback 的执行。

## libux 都是用 thread pool 来处理异步事件的吗？

1. Network I/O 是使用系统提供的非阻塞式 I/O 解决方案，例如在 Linux 上使用 epoll，windows 上使用 IOCP。
2. 文件操作和 DNS 操作没有（很好的）系统解决方案，因此 libuv 自建了线程池，在其中进行阻塞式 I/O。

## cpu 密集型的处理

[Node.js 软肋之 CPU 密集型任务
](https://www.infoq.cn/article/nodejs-weakness-cpu-intensive-tasks)

### 为什么 node 不适合处理计算密集型任务 cpu

由于 node 是单  线程，如果在这个线程做太多事情了,会没精力处理其他同步  任务和回调任务。
![Node.js 软肋之 CPU 密集型任务](https://static001.infoq.cn/resource/image/6c/4a/6c3fe7d65d45eaf124b25124cdd2bf4a.png)

## brower

[深入理解 js 事件循环机制（浏览器篇）](http://lynnelv.github.io/js-event-loop-browser)
[这一次，彻底弄懂 JavaScript 执行机制](https://juejin.im/post/59e85eebf265da430d571f89)

### 异步任务的  执行。

![](https://user-gold-cdn.xitu.io/2017/11/21/15fdd88994142347?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
异步任务，注册回调函数到 event table; 等异步任务执行完成，会将回调函数放到 event queue;

![](https://user-gold-cdn.xitu.io/2017/11/21/15fdcea13361a1ec?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![](http://lynnelv.github.io/img/article/event-loop/event-loop.jpg)

### 浏览器循环执行？

1. 执行 macrotask 队列的一个任务
2. 执行完当前 microtask 队列的所有任务
3. UI render

### 宏任务 微任务

macro-task(宏任务)：包含执行整体的 js 代码，事件回调，XHR 回调，定时器（setTimeout/setInterval/setImmediate），IO 操作，UI render
micro-task(微任务)：Promise，process.nextTick

```js
console.log("start");

setTimeout(function() {
  console.log("setTimeout");
}, 0);

Promise.resolve()
  .then(function() {
    console.log("promise1");
  })
  .then(function() {
    console.log("promise2");
  });

console.log("end");

// output: start, end ,promise1,promise2,setTimeout
```

1.  整体 script 作为宏任务 ，首先执行
2. 执行 console.log('start');
3.  遇到 setTimeout,立即执行, 其回调被分发到宏任务队列中。
4. 遇到 Promise，立即执行 ，其 promise 被分发到微任务队列中
5. 检查微任务队列中有可执行的任务。 此时 promise 第一个 then 执行完毕，输出 promise1，继续触发个 promise，输出 promise2
