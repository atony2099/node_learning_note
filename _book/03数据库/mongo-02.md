[Mongoose 学习参考文档](https://cnodejs.org/topic/504b4924e2b84515770103dd)
[Mongoose 基础入门](https://www.cnblogs.com/xiaohuochai/p/7215067.html?utm_source=itdadao&utm_medium=referral#anchor9)
[mongo Shell Methods](https://docs.mongodb.com/manual/reference/method/)
[Understanding Virtuals in Mongoose](https://futurestud.io/tutorials/understanding-virtuals-in-mongoose)
[mac 下安装和配置 mongodb 的步骤详解](http://www.jb51.net/article/119781.htm)
[Mac 新手从入门到放弃 MongoDB](https://www.cnblogs.com/lewiscutey/p/8052968.html)
[Mongoose 介绍和入门](http://www.cnblogs.com/zhongweiv/p/mongoose.html#mg_connstr)

[常见面试题整理--数据库篇（每位开发者必备）](https://zhuanlan.zhihu.com/p/23713529)

# mongodb 学习笔记

##  常用概念

1. 关系型数据库(mysql) vs 非关系型数据库(mongodb)
2. 常用概念
   1. 主键：定义记录的唯一标示  符号。用来保证  数据的唯一性。
      > mongodb 自动回创建一个\_id 的字段当做 primarykey
   2. 外键： 一个字段在别的表中是主键，在这个表中称为外键。用来与其他表  建立联系。
   3. join: 将多个表联合起来进行操作。

3) N/A: not applicable:不存在这个字段。

### 数据库索引

提前排列好次序，使得数据库查询效率  更高

 缺点： 1. 插入和  修改数据要花费较多的时间。(需要重新建索引) 2. 每个索引要占物理空间

### vitural

virtual properties dont get persisted in the database;
regard them as field helper;

```js
var userSchema = new Schema({
  first: String,
  last: String
});

userSchema.virtual("fullname").get(function() {
  return this.first + " " + this.last;
});
```

## mongo 基础

### mongod

deamon for mongodb system.

### 使用

```shell
mongod //启动数据##库
mongo //连接数据库

show databases    　　　　　　　　　　 //  show  查看有哪些数据库，也可show dbs
use demo           　　　　　　　　　　//  use  创建数据库（如果数据库不存在，则创建数据库，否则切换到指定数据库）
show collections   　　　　　　　　　　//  查看有哪些集合（collections相当于SQL中的一个个表）
db.createCollection('movie')        //  创建集合（相当于创建表

// 增删改查
db.demo01.insertOne({ name: "jim", location: "fuzhou" });
db.demo01.deleteOne();
db.demo01.updateOne({ name: "jon" }, { $set: { location: "qinghai" } });
db.demo01.find();
```

####  查找

1.  是否存在

```json
{ "qty": { "$exists": true } }
```

2.

#### 删除

1. deleteMany({}):删除所有

### 与其他数据库对比

![ref](https://images2017.cnblogs.com/blog/1108319/201712/1108319-20171219230026490-756534167.jpg)

![ref](https://docs.mongodb.com/manual/_images/crud-annotated-mongodb-insertOne.bakedsvg.svg)

### scheme && model

1. scheme:
   1. map to collection
   2. define the shape of the document within that collection
2. model: a. 如何 curd 数据 b. create a new document
3. document：由 model 生成的一个具体数据实体。equeal row in mysql

### data-type

- String
- Number
- Date
- Buffer
- Boolean
- Mixed: AnyType
- Array

#### Objectid

是一个对象。 形式 ObjectID('12345');
在 js 中 objectid(123)被转换成 string object;  等于 new string('123')

> 按照特定规则生成的一串字符。
> ![ref](https://images2015.cnblogs.com/blog/563063/201705/563063-20170516142739682-838031095.png)

相关属性：
unique:唯一约束，声明改字段是唯一的

## field

1. \$exist ====
2.

### 数据库的转移 （从本地转移到线上）

1. 压缩数据库
2. scp 到  服务器
3. 解压缩
4. mongorestore 到服务器。

## mongo 原理

### BSON

JSON-like

mongodb use to store document

## middleware

### do what

[Middleware](https://mongoosejs.com/docs/middleware.html)

which are passed control during execution of asynchronous functions.

### 类型

1. 可以插入 middleware 的 documnet
   validate，save, remove ,init

2) 可以插入 middleware 的 query and model
   1. count
   2. find
   3. findOne
   4. findOneAndRemove
   5. findOneAndUpdate
   6. remove
   7. update
   8. updateOne
   9. updateMany

### pre

```js
MusicSchema.pre("save", function(next) {
  const now = new Date();
  this.update_at = now;
  next();
});
```

when their save method is called, not on the model when update is called.

### post

## mongoose 操作

### 查询参数 query

- 满足任一条件：{\$or:[]};
- 大于: {field: {\$gt: value} }
- 是否存在: { field: { \$exists: <boolean> } }

###排序

sort {field:1} // 1 升序 2，降序

## mongo-operation

### mongoose

#### define

Mongoose.prototype.model()

- name «String|Function» model name or class extending Model
- [schema] «Schema»
- [collection] «String» name (optional, inferred from model name)

### FIND

[find](https://mongoosejs.com/docs/api.html#model_Model.find)

#### lean

```js
let document = await Model.find();
```

查询的结果是 document; document 包含其他的属性和方法。
lean 会返回一个  简单的对象;They have no save method, getters/setters or other Mongoose magic applied

#### find

Model.find()
Parameters

conditions «Object»
[projection] «Object|String» optional fields to return, see Query.prototype.select()
[options] «Object» optional see Query.prototype.setOptions()
[callback] «Function»

```
// passing options and executing immediately
MyModel.find({ name: /john/i }, null, { skip: 10 }, function (err, docs) {});
```

#### count

##### countDocuments

```
db.collection.aggregate([
   { $match: <query> },
   { $group: { _id: null, n: { $sum: 1 } } } )
])
```

##### estimatedDocumentCount

通过 metadata 计算

### UPDATE

By default, Mongoose don’t return the post-update document. But, there is an option to force it.

Using any find & update function like findByIdAndUpdate(), findAndUpdate() or findOneAndUpdate() just add the third param with new: true.

### aggregate

![](https://docs.mongodb.com/manual/_images/aggregation-pipeline.bakedsvg.svg)

1. lookup:left-join
2. project: 制定某些字段

一系列组合操作组成一个数据处理流。

#### lookup

#### \$unwind:

松开 ==== 把 array 拆成多条记录

```js
name:tang like:[basketball,football];
=>
name:tang,like:basketball,
name:Tang,like:football
```

#### group

== 聚合数据====
