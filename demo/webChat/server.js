//内置的http模块提供了HTTP服务器和客户端功能
var http = require('http')
var fs = require('fs')
var path = require('path')
//附加的mime模块有根据文件扩展名得出MIME类型的能力
var mime = require('mime')
//cache是用来缓存文件内容的对象
var cache = {}


//所在请求的文件不存在时发送404错误的
function send404(response) {
	response.writeHead(404, {'Content-Type':'text/plain'});
	response.write('Error 404:resource not found.')
	response.end();
}
//提供文件数据服务
function sendFile(response,filePath,fileContents){
	response.writeHead(200,{'Content-Type':mime.lookup(path.basename(filePath))})
	response.end(fileContents)
}
//确定文件是否缓存了，如果是，就返回它。如果文件不存在，则返回一个HTTP 404错误作为响应。
function serveStatic(response,cache,absPath){
	//检查文件是否缓存在内存中
	debugger;
	if(cache[absPath]){
		//从内存中返回文件
		sendFile(response,absPath,cache[absPath]);
	}else{
		//检查文件是否存在
		fs.exists(absPath,function(exists){
			if(exists){
				//从硬盘中读取文件
				fs.readFile(absPath,function(err,data){
					if(err){
						send404(response);
					}else{
						cache[absPath] = data
						//从硬盘中读取文件并返回
						sendFile(response,absPath,data)
					}
				});
			}else{
				//发送HTTP 404响应
				send404(response);
			}
		})
	}
}


//创建HTTP服务器的逻辑
//用匿名函数定义对每个请求的处理行为
var server = http.createServer(function(request,response){
	var filePath = false;
	if(request.url == '/'){
		filePath = 'public/index.html';//确定返回的默认HTML文件
	}else{
		//将URL路径转为文件的相对路径
		filePath = 'public' + request.url;
	}
	var absPath = './' + filePath;
	//返回静态文件
	serveStatic(response,cache,absPath);
})


server.listen(3000, function(){
	console.log("server listening on port 3000.");
})


//加载一个定制的Node模块，它提供的逻辑是用来处理基于Socket.IO服务端聊天功能的
var chatServer = require('./lib/chat_server');
chatServer.listen(server);
//启动Socket.IO服务器，给它提供一个已经定义好的HTTP服务器，这样它就能跟HTTP服务器共享同一个TCP/IP端口
