var mongoose = require('./db.js')

    //定义一个schema
let Schema = mongoose.Schema({
    category:String,
    name:String
})

// 注册生成一个新的model类型 ====
  // let Model = mongoose.model("Student",Schema);

// 第二种方式
 mongoose.model("Family",Schema); // 1.注册model
 let Family = mongoose.model("Family"); // 2. 从model中读取数据

//生成一个document
let tang = new Family({
    score:1000,
    name:'tang'
});
//存放数据
tang.save((err,apple)=>{
    if(err) return console.log(err);
    // apple.eat();
    //查找数据
    Family.find({name:'tang'},(err,data)=>{
        console.log(data);
    })
});
