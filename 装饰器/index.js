@isTestable(true)
class MyClass { }

function isTestable(value) {
   return function decorator(target) {
      target.isTestable = value;
   }
}

console.log(MyClass.isTestable);