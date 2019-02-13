
// demos/02.js
const fs = require('fs');
const Koa = require('koa');
const app = new Koa();
const path = require('path')


let localPath = path.join(__dirname, './template.html')

let data01 = fs.readFileSync(localPath);
console.log(data01,"data01")


// 返回一个read string.
let data02 = fs.createReadStream(localPath);

data02.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
});

data02.on('end', () => {
  console.log('There will be no more data.');
});

// console.log(data02,"data02")