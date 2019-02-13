const EventEmitter = require("events");

console.log("test=====");
// class MyEmitter extends EventEmitter {}
// const myEmitter = new MyEmitter();
// myEmitter.on("event", data => {
//   console.log("an event occurred!", data);
// });
// myEmitter.emit("event", "a", "n");

console.log("2====");

// let emitter = new EventEmitter();

// emitter.on("myEvent", () => {
//   console.log("hi 1");
// });

// emitter.on("myEvent", () => {
//   console.log("hi 2");
// });

// emitter.emit("myEvent");

let emitter = new EventEmitter();

emitter.on("myEvent", () => {
  console.log("hi");
  emitter.emit("myEvent");
});

emitter.emit("myEvent");
