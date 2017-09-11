const path = require('path')
const fs = require('fs')
// path.basename() 方法返回一个 path 的最后一部分
console.log(path.basename('E:\\demo\\node\\http.js'))  //http.js
console.log(path.basename('E:\\demo\\node\\http.js','.js'))  //http

// 任何操作系统上处理 Windows 文件路径时获得一致的结果，可以使用 path.win32
console.log(path.win32.basename('E:\\demo\\node\\http.js'))  //http.js
// console.log(fs.readdirSync('e:\\'))  //
// console.log(fs.readdirSync('e:'))


// path.delimiter:提供平台特定的路径分隔符
console.log()
// path.dirname(path):方法返回一个 path 的目录名
console.log(path.dirname('E:\\demo\\node\\http.js')) //E:\demo\node
//path.extname(path):方法返回 path 的扩展名,即从 path 的最后一部分中的最后一个 .（句号）字符到字符串结束。 如果 path 的最后一部分没有 . 或 path 的文件名（见 path.basename()）的第一个字符是 .，则返回一个空字符串。
console.log(path.extname('index.html')) //'.html'
console.log(path.extname('index.')) //'.'
console.log(path.extname('.index')) //''

// path.format(pathObject): 方法会从一个对象返回一个路径字符串。 与 path.parse() 相反。
console.log(path.format({dir: 'E:\\demo\\node',base: 'http.js'})) //E:\demo\node\http.js
//path.parse(path):方法返回一个对象，对象的属性表示 path 的元素


// path.isAbsolute() 方法会判定 path 是否为一个绝对路径
console.log(path.isAbsolute('//server'))    // true
console.log(path.isAbsolute('\\\\server'))  // true
console.log(path.isAbsolute('C:/foo/..'))   // true
console.log(path.isAbsolute('C:\\foo\\..')) // true
console.log(path.isAbsolute('bar\\baz'))   // false
console.log(path.isAbsolute('bar/baz'))    // false
console.log(path.isAbsolute('.'))        // false

// path.join([...paths])方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径.
console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'))   // 返回: '\foo\bar\baz\asdf'

// path.normalize(path): 方法会规范化给定的 path，并解析 '..' 和 '.' 片段
