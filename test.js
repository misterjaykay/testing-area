// fs.readFile takes a callback function, which means it will not block the execution of your script.
// fs.readFileSync however does not take a callback, which means that the execution of your script will be paused untill the process is finished.
// Using promisfy is one way to solve this issue, for small files it wont make a difference, 
// but for large files you might want to transform fs.readFileSync into a promise so you wont block the execution.
// Hope that helps.

const fs = require('fs')
const util = require('util')

const testFunc1 = async () => {
fs.writeFileSync('text.txt', 'hello world')
console.log('file write done with writeFileSync')
}

const writeFilePromisified = util.promisify(fs.writeFile)
const testFunc2 = async () => {
await writeFilePromisified('text.txt', 'hello world')
console.log('file write done with promisified writeFile')
}

console.log('start test1')
testFunc1().then(() => {
console.log('promise 1 is fullfiled')
})

console.log('start test2')
testFunc2().then(() => {
console.log('promise 2 is fullfiled')
})