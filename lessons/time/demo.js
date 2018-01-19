// const util = require('util')
// const setImmediatePromise = util.promisify(setImmediate)
//
// setImmediatePromise('http').then(value) => {
//
// }
// async function timerExample() {
//     console.log('Before')
//     await setImmediatePromise()
//     console.log('after')
// }
// timerExample()

setTimeout( () => {
    console.log(1)
},2000)
