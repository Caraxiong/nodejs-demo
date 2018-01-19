let fs = require('fs')

let buffer = `<!DOCTYPE html>
				<html>
				<head>
					<title></title>
					<meta charset="utf-8">
					<title></title>
				</head>
				<body>
				Hello
				</body>
				</html>`
fs.mkdir(__dirfilepath+'/react',function(err){
	if(err){
		return console.error(err);
	}
	//success
})
// fs.writeFile('/react/index.html',buffer,function(err) {
// 	if(err){
// 		return console.error(err)
// 	}
// 	console.log('写入成功 ')
// })