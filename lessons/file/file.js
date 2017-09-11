const fs = require('fs')
let data = 'output可写入流'
// 创建一个可读流
let readerStream = fs.createReadStream('input.txt')
readerStream.setEncoding("UTF8")
readerStream.on('data',(chunk) => {
    data += chunk
})
readerStream.on('end',() => {
    console.log(data)
})
readerStream.on('error',(err) => {
    console.log(err.stack)
})
console.log('读写程序执行完毕')


// 创建一个可以写入的流，写入到文件 output.txt 中
let writerStream = fs.createWriteStream('output.txt')
// 使用 utf8 编码写入数据
writerStream.write(data,'UTF8')
// 标记文件末尾
writerStream.end()
// 处理流事件 --> data, end, and error
writerStream.on('finish',()  => {
    console.log('写入完成。')
})
writerStream.on('error',(err) => {
    console.log(err.stack);
})
console.log('写入程序执行完毕')

// 管道流
let pipeStream = fs.createWriteStream('pipe.txt')
readerStream.pipe(pipeStream)
console.log("管道流执行完毕")


// 链式流
let zlib = require('zlib')
fs.createReadStream('zlib.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('zlib.txt.gz'))
console.log('文件压缩完成。')

//解压缩
fs.createReadStream('zlib.txt.gz').pipe(zlib.createGunzip()).pipe(fs.createWriteStream('zlib.gz.txt'))
console.log('文件解压完成。')
//异步
// fs.unlink('/tmp/hello',(err) => {
//     if(err) throw err;
//     console.log('成功删除 /tmp/hello')
// })
//同步
// fs.unlinkSync('/tmp/hello')
// console.log('成功删除 /tmp/hello')
