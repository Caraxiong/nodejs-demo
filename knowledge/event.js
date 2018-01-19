const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter()

myEmitter.on('event',() => {
	console.log('触发了一个事件')
})
myEmitter.emit('event')

myEmitter.on('event1', (a, b) => {
  setImmediate(() => {
    console.log('这个是异步发生的');
  });
});
myEmitter.emit('event1', 'a', 'b');
 // eventEmitter.once() 方法时可以注册一个对于特定事件最多被调用一次的监听器。 当事件被触发时，监听器会被注销，然后再调用
let m = 0;
myEmitter.once('event2', () => {
  console.log(++m);
});
myEmitter.emit('event2');
// 打印: 1
myEmitter.emit('event2');
// 忽略