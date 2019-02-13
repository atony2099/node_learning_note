const path = require('path');

const {resolve,join} = path;


// 自动制定分隔符号
console.log(join(__dirname,"abc"))
console.log(join("/f","/g"))



//  resolve ====== 将一系列相对路径转换为绝对路径------
// 
// ------/代表根路径 
// 如果没有跟路径，会把当前所在目录当做个根路径
console.log(__dirname)
console.log(resolve(__dirname,'./index.js'));
console.log(resolve(__dirname,'/index.js'))
console.log(resolve("q","qq"))
console.log(resolve("/z1","z2","../z3"))
console.log(resolve(__dirname, './schema', './**/*.js'))

