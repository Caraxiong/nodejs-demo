const path = require('path')
console.log(path.basename('C:\\temp\\myfile.html'))   //myfile.html

console.log(path.win32.basename('C:\\temp\\myfile.html'))

console.log(path.basename('C:\\temp\\myfile.html','.html'))   //myfile

console.log(process.env.PATH)
// 提供平台特定的路径分隔符
console.log(process.env.PATH.split(path.delimiter))
// 返回一个 path 的目录名
console.log(path.dirname('/temp/cara/demo'))  ///temp/cara
// 返回 path 的扩展名
path.extname('index.html');
// 返回: '.html'

path.extname('index.coffee.md');
// 返回: '.md'

path.extname('index.');
// 返回: '.'

path.extname('index');
// 返回: ''

path.extname('.index');
// 返回: ''
// path.format(pathObject)
// dir <string>
// root <string>
// base <string>
// name <string>
// ext <string>
// 如果提供了 pathObject.dir，则 pathObject.root 会被忽略
// 如果提供了 pathObject.base 存在，则 pathObject.ext 和 pathObject.name 会被忽略
console.log(path.format({
	dir:'\\dir',
	root:'\\root',
	base:'a.html',
	name:'a',
	ext:'.html'
}))  //\dir\a.html

// 判定 path 是否为一个绝对路径
console.log(path.isAbsolute('//server'))

console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '/a' ,'/b','..'))  //\foo\bar\baz\asdf\quux\a
console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '/a' ,'/b'))  //\foo\bar\baz\asdf\quux\a\b

//规范化给定的 path
console.log(path.normalize('C:\\temp\\\\foo\\bar\\..\\'))  //C:\temp\foo\
console.log(path.win32.normalize('C:////temp\\\\/\\/\\/foo/bar'))  //C:\temp\foo\bar

console.log(path.parse('C:\\path\\dir\\file.txt'))  
// { root: 'C:\\',
//   dir: 'C:\\path\\dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }

// path.relative(from, to) 返回从 from 到 to 的相对路径（基于当前工作目录）
console.log(path.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb'))  //..\..\impl\bbb
console.log(path.relative('', 'C:\\orandea\\impl\\bbb'))  //C:\orandea\impl\bbb
console.log(path.relative('C:\\orandea\\test\\aaa', ''))  //F:\github\nodejs-demo\knowledge

// path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径
// 没有传入 path 片段，则 path.resolve() 会返回当前工作目录的绝对路径

console.log(path.resolve('/foo/bar', './baz')) //F:\foo\bar\baz
console.log(path.resolve('/foo/bar', '/tmp/file/')) //F:\tmp\file 
console.log(path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'))  //F:\github\nodejs-demo\knowledge\wwwroot\static_files\gif\image.gif

// path.sep:平台特定的路径片段分隔符
console.log('foo\\bar\\baz'.split(path.sep)) //[ 'foo', 'bar', 'baz' ]
