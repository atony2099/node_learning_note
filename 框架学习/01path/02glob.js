const path = require('path');

const {resolve} = path;
const {glob} = require('glob')


console.log(__dirname);

glob.sync(resolve(__dirname,"./a","**/*.js")).forEach(file => {
  console.log(file,"first====");
})
 


console.log('====================================');
console.log("test=============");
console.log('====================================');

let arrays = glob.sync("/a/**/*.js")
console.log(arrays);

arrays.forEach(files => {
  console.log(files,"second");
});
  




