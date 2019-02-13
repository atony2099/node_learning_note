// 1. 1.0 的时候定义function的方式


function AFunc (x,y){
    this.x = x;
    this.y =  y;
}
AFunc.prototype.printString = function(){
    console.log(this.x + this.y,"toStringF")
}
let q = new AFunc(100,102)
q.printString()




class AClass {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    printString(){
        console.log(this.x + this.y,"toStringclass===")
    }
}

console.log('====================================');
console.log(typeof(AClass));
console.log('====================================');

console.log('====================================');
console.log(AClass.prototype.constructor === AClass);
console.log('====================================');
console.log('====================================');
let clas = new AClass(30,20);
clas.printString()
console.log('====================================');