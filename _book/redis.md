# redis 99 个自问自答。

##入门

1. 为什么需要  使用 redis

   1. 编程两大核心工作处理数据，存储数据 。
   2. 存储数据而言除了数据库存储方式， 内存存储也是很重要的手段。 而 redies 是关于内存  存储一套比较完整的体系。

2. redis 基础的操作
   1. 存取： set,get,
   2. add delete: incr

3)

##  多线程

1. Redis is single-threaded;
2. Because you have no guarantees on network latency,
    存储操作  是通过 redis service 完成的。

## 作用

![](https://www.sohamkamani.com/normal-example-70adf635cfd14f9488bb714fbdc43f7a.svg)

![](https://www.sohamkamani.com/with-cache-a83a81ff69f801eafbadd4aedab05ff2.svg)

## 数据类型

1. string
2. List
3. Set
4. Hash
5. Sort Set


##  常用的语法

1. redis-cli

    1. ping:当前 redis 是否 ping 通。
  

## redis 实际  运用

```js
let no_reply_topics = await service.cache.get("no_reply_topics");
if (!no_reply_topics) {
  const query = { reply_count: 0, tab: { $nin: ["job", "dev"] } };
  const options = { limit: 5, sort: "-create_at" };
  no_reply_topics = await service.topic.getTopicsByQuery(query, options);
  await service.cache.setex("no_reply_topics", no_reply_topics, 60 * 1);
}
```

## 登录流程 -- 如何设置 redis



