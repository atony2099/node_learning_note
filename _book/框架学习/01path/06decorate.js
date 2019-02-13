

// A simple decorator


// 1.作用于类("改变属性的值")

function annotation(click) { 
    return function(target) {
     target.annotated = click;
    }
}

@annotation(false)
class MyClass { }

console.log(MyClass.annotated,"clickAable")
// 作用于方法上

// 2. 1.作用于方法上1. 改变方法的属性。
function readonly(target,name,descriptor){
    
    console.log(target,name,"decorate====")
    descriptor.writable = false
    return descriptor;
}
class Cat {
    @readonly
    say() {
        console.log("meow ~");
    }
}
let kitty = new Cat()
//===== readonly
// kitty.say = function(){
//     console.log("hello")
// }


// 2. 2.作用于方法上。扩展方法




function rest(target,name,descriptor){
    let run = descriptor.value
    descriptor.value = function(){
        run()
        console.log("run ==== just have a rest")
    }
    return descriptor;
}
class Person {
    @rest
    run() {
        console.log("meow ~");
    }
}
let tang = new Person()
tang.run()
















//   const luke = new Boy()
//   luke.run()