//这些声明让我们可以使用Socket.IO,并初始化了一些定义聊天状态的变量
var socketio = require('socket.io');
var io;
var guestNumber = 1;
// 昵称数组
var nickNames = [];
//被占用昵称
var namesUsed = [];
var currentRoom = [];
//定义聊天服务器函数listen.server.js中会调用这个函数。它启动Socket.IO服务器，限定Socket.IO向控制台输出的日志的详细程度，并确定该如何处理每个接进来的连接。
//启动Socket.IO服务器
exports.listen = function(server){
	//启动Socket.IO服务器，允许它搭载在已有的HTTP服务器上
	io = socketio.listen(server);
	io.set('log level',1);
	//定义每个用户连接的处理逻辑
	io.sockets.on('connection',function(socket){
		// 在用户连接上来时赋予其一个访客名
		guestNumber = assignGuestName(socket,guestNumber,nickNames,namesUsed);
		//用户连接上来时把他放入聊天室Lobby里
		joinRoom(socket,'Lobby');
		//处理用户的消息更名，以及聊天室的创建和变更
		handleMessageBroadcasting(socket,nickNames);
		handleNameChangeAttepmpts(socket,nickNames,namesUsed);
		handleRoomJoining(socket);
		//用户发出请求时，向其提供已经被占用的聊天室的列表
		socket.on('rooms',function(){
			socket.emit('rooms',io.sockets.manager.rooms);
		});
		//定义用户断开连接后的清除逻辑
		handleClientDisconnection(socket,nickNames,namesUsed);
	})
}
//分配昵称
function assignGuestName(socket,guestNumber,nickNames,namesUsed){
	//生成新昵称
	var name = 'Guest'+guestNumber;
	//把用户昵称根客户端连接ID关联上
	nickNames[socket.id] = name;
	//让用户知道他们的昵称
	socket.emit('nameResult',{
		success:true,
		name:name
	});
	//存放已经被占用的昵称
	namesUsed.push(name);
	//增加用来生成昵称的计数器
	return guestNumber + 1;
}

function joinRoom(socket,room){
	//让用户进入房间
	socket.join(room);
	//记录用户的当前房间
	currentRoom[socket.id] = room;
	//让用户知道他们进入了新的房间
	socket.emit('joinResult',{room: room});
	// 让房间里的其他用户知道有新用户进入了房间
	socket.broadcast.to(room).emit('message',{text:nickNames[socket.id]+' has joined '+room + '.'});
	//确定有哪些用户在这个房间
	var usersInRoom = io.sockets.clients(room);
	//如果不止一个用户在这个房间里，汇总下都是谁
	if(usersInRoom.length > 1){
		var usersInRoomSummary = 'Users currently in '+room+';';
		for(var index in usersInRoom){
			var userSocketId = usersInRoom[index].id;
			if(userSocketId != socket.id){
				if(index>0){
					usersInRoomSummary += ', ';
				}
				usersInRoomSummary += nickNames[userSocketId];
			}
		}
		usersInRoomSummary += '。';
		//将房间里其他用户的汇总发送给这个用户
		socket.emit('message',{text:usersInRoomSummary});
 	}
}
//处理昵称变更请求
function handleNameChangeAttepmpts(socket, nickNames,namesUsed) {
	//添加nameAttempt事件的监听器
	socket.on('nameAttempt',function(name){
		//昵称不能以Guest开头
		if(name.indexOf('Guest') == 0){
			socket.emit('nameResult',{
				success: false,
				message: 'Names cannot begin with Guest .' 
			});
		}else{
			//昵称还没注册就注册上
			if(namesUsed.indexOf(name) == -1){
				var previousName = nickNames[socket.id];
				var previousNameIndex = namesUsed.indexOf(previousName);
				namesUsed.push(name);
				nickNames[socket.id] = name;
				// 删除之前用的昵称，让其他用户可以使用
				delete namesUsed(previousNameIndex);
				socket.emit('nameResult',{
					success:true,
					name:name
				});
				socket.broadcast.to(currentRoom[socket.id]).emit('message',{text:previousName+' is now known as '+name+'.'});
			}else{
				//如果昵称已经被占用，给客户端发送错误消息
				socket.emit('nameResult',{
					success:false,
					message:'That name is already in use.'
				})
			}
		}
	})
}
//发送聊天消息
// socketIO的broadcast函数是用来转发消息的
function handleMessageBroadcasting(socket){
	socket.on('message',function(message){
		socket.broadcast.to(message.room).emit('message',{
			text: nickNames[socket.id] +': '+message.text
		})
	})
}
//创建房间
function handleRoomJoining(socket){
	socket.on('join',function(room){
		socket.leave(currentRoom[socket.id]);
		joinRoom(socket,room.newRoom);
	})
}
//用户断开连接
function handleClientDisconnection(socket){
	socket.on('disconnect',function(){
		var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
		delete namesUsed[nameIndex];
		delete nickNames[socket.id];
	})
}