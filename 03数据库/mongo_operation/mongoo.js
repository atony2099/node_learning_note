const mongoose = require('mongoose')
const db = 'mongodb://localhost/douban-test'

// 连接数据库====
function connect() {

  return new Promise((resolve, reject) => {
    mongoose.connect(db)
    mongoose.connection.once('open', () => {
      resolve()
      console.log("connetect success");
    }).catch((error) => {
      console.log(error);
    })

  })
}

connect().then(()=> {
  // 配置model
  const Dog = mongoose.model('Dog', {name: String})
  const doga = new Dog({name: '阿尔法'})

  doga.save().then(() => {
    console.log('wang')
  })


})
