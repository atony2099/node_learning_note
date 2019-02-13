/*
 * @Author: atony2099 
 * @Date: 2018-08-02 22:37:09 
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-01 19:44:59
 */


try {
  throw new Error('Whoops!');
} catch (e) {
  // console.log(Error)
  // console.log(e.name + ': ' + e.message);
}



let eror1 = new Error('Whoops!')

let eror2 = new Error('Whoops!')
eror2.message = '122222';
console.log(eror1.message, eror2.message)


class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    console.log(this.constructor.name)

  }
}


let a = new MyError("aa")